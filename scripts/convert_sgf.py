import os
import sys
import json
import string
import sgf

proj_path = os.path.join(os.getcwd(), '..')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
sys.path.append(proj_path)
os.chdir(proj_path)
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

from backend.models import Problem


def translate(coordinate):
    column, row = [c for c in coordinate]
    letters = [c for c in string.ascii_lowercase][:19]
    return (letters.index(row), letters.index(column))

def format(coordinate):
    return '{},{}'.format(coordinate[0], coordinate[1])

def convert_tree(tree):
    new_tree = {}
    if not tree:
        return new_tree
    for child in tree.children:
        assert(len(child.nodes) == 1 or len(child.nodes) == 2)
        move = format(translate(child.nodes[0].properties['B'][0]))
        new_tree[move] = {}
        if len(child.nodes) == 1:
            # Assumes 'incorrect' never appears
            comment = child.nodes[0].properties['C']
            if comment:
                comment = comment[0]
                if 'correct' in comment.lower():
                    new_tree[move]['success'] = True
                if comment != 'Correct':
                    new_tree[move]['comment'] = comment
        else:
            response = format(translate(child.nodes[1].properties['W'][0]))
            new_tree[move]['move'] = response
            subtree = convert_tree(child)
            if subtree:
                new_tree[move]['responses'] = subtree
    return new_tree


with open(os.path.join(proj_path, 'scripts', 'problems', 'sample.sgf')) as f:
    problem = Problem()
    sgf = sgf.parse(f.read())
    tree_root = sgf.children[0]

    properties = tree_root.root.properties
    initial_black = [translate(c) for c in properties['AB']]
    initial_white = [translate(c) for c in properties['AW']]
    board = []
    for r in range(19):
        row = []
        for c in range(19):
            row.append(0)
        board.append(row)
    for stone in initial_black:
        board[stone[0]][stone[1]] = 1
    for stone in initial_white:
        board[stone[0]][stone[1]] = -1

    new_tree = convert_tree(tree_root)
    problem.responses = json.dumps(new_tree)
    problem.board = json.dumps(board)
    problem.end_row = 0
    problem.end_col = 0
    problem.rating = 500
    problem.save()

from varname  import nameof,argname
import gc
from recover import run_recovery

import threading
import inspect
import sys

def inside(x,y):
    for a in x:
        if a in y:return True
    else:return False


class Name:
    def __init__(s,var):
        name = 'None'
        if name is str:
            name = var
        else:
            name = (nameof(var, frame=3, vars_only=False))
        a = inspect.currentframe()

        s.name = name
        s.frame = inspect.currentframe().f_back.f_back
        s.local = s.frame.f_locals
        s.globals = s.frame.f_globals
        s.n = name.split('.')
        s.last = s.n[-1]
        s.cls = s.local
        s.get = lambda: s.cls[s.last]
        s.set = lambda value: s.cls.__setitem__(s.last, value)
        print(name)

        # if not inside(('(','[','{',',','+'),name) and name.isalnum() and (name.isalnum() and '.' in name):
        #
        #
        #     if '.' in name:
        #         x = s.local[s.n[0]]
        #
        #         for i in range(1, len(s.n) - 1):
        #             x = x.__getattribute__(s.n[i])
        #
        #         s.get = lambda: x.__getattribute__(s.last)
        #         s.set = lambda  value: x.__setattr__(s.last, value)
        # else:
            c = compile(name,'','eval')
            print(eval(c,s.globals,s.local))

    def __call__(s):
        return s.get()

    def __str__(s):
        return '<'+s.name+':'+(s().__repr__())+'>'

    def __repr__(s):
        return s.__str__()

class AssignSpace:
    def __init__(s,title='AssignSpace'):
        from frontend.webapp import WebApp
        s.graphs    = []
        s.editables = []
        s.scopes    = {}
        s.app = WebApp(s)


    def graph(s,var):
        name = Name(var)
        #
        # if (not name in s.graphs):
        #     s.graphs.append(name)
        #     if (not name in s.editables):
        #         ...
        for scope in inspect.getouterframes(name.frame):
            # print(scope)
            n = '> '+' > '.join(name.frame.f_code.co_filename.split('/')[-2:]) + ':' + str(name.frame.f_code.co_name)

            s.scopes[id(scope)] = [scope,n]
        # print(s.scopes)
        s.graphs.append(name)
        s.app.new_card(name)

        return name

    def control(s,var):
        name = Name(var)
        # s.editables.append(name)
        return name


    def save_state(s,file='/'):
        frame_traceback = []
        frame = inspect.currentframe().f_back
        b_frame = frame

        stack = inspect.stack()

        try:
            while True:
                frame_traceback.append(frame)
                frame = frame.f_back
        except AttributeError:
            ...
        frame_traceback = frame_traceback[:-1]

        # print(
        run_recovery(stack,frame_traceback)

        # print([t.f_locals for t in ])

        ...






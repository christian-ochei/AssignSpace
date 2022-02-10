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
    def __init__(s,var,f__frame):
        name = 'None'
        if name is str:
            name = var
        else:
            name = (nameof(var, frame=f__frame, vars_only=False))
        a = inspect.currentframe()

        s.name = name
        s.frame = inspect.currentframe().f_back.f_back

        if f__frame == 4:
            s.frame = s.frame.f_back

        s.local = s.frame.f_locals
        s.globals = s.frame.f_globals
        s.n = name.split('.')
        s.last = s.n[-1]
        s.cls = s.local
        s.get = lambda: s.cls[s.last]
        s.set = lambda value: s.cls.__setitem__(s.last, value)
        print(name)

        s.c  = compile(name,'','eval')

        # if not hasattr(var, '__iter__'):
        #     s.c  = compile(name,'','eval')
        # else:
        #     s.c = compile(f'[*{name}]','','eval')
        # s.ac = compile(f'{name} = __last_return','','exec')

        s.get = lambda:(eval(s.c,s.globals,s.local))
        s.set = lambda __last_return:(s.local.update({'__last_return':__last_return}),(exec(s.ac,s.globals,s.local)))

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


    def graph(s,var,controllable=False,f__frame=3):
        name = Name(var,f__frame)
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
        # if not :
        s.graphs.append(name)
        if controllable:
            s.editables.append(name)

        s.app.new_card(name,var,graph=not controllable)

        return name

    def control(s,var):
        return s.graph(var,controllable=True,f__frame=4)


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






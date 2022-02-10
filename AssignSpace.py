from varname import nameof,argname
import inspect

def inside(x,y):
    for a in x:
        if a in y:return True
    else:return False


class Name:
    def __init__(self,var,f__frame):
        # f__frame -= 1
        # name = 'None'
        if type(var) is str:
            name = var
        else:
            name = (nameof(var, frame=f__frame, vars_only=False))
        a = inspect.currentframe()

        self.name = name
        self.frame = inspect.currentframe().f_back.f_back.f_back

        if f__frame-1 == 4:
            self.frame = self.frame.f_back

        self.local = self.frame.f_locals
        self.globals = self.frame.f_globals
        self.n = name.split('.')
        self.last = self.n[-1]
        self.cls = self.local
        self.get = lambda: self.cls[self.last]
        self.set = lambda value: self.cls.__setitem__(self.last, value)
        self.c  = compile(name,'','eval')
        self.ac = compile(f'{name} = __last_return','','exec')

        self.get = lambda:(eval(self.c,self.globals,self.local))
        self.set = lambda __last_return:(self.local.update({'__last_return':__last_return}),(exec(self.ac,self.globals,self.local)))

        # self.set(130)

    def __call__(self):
        return self.get()

    def __str__(self):
        return '<'+self.name+':'+(self().__repr__())+'>'

    def __repr__(self):
        return self.__str__()

class AssignSpace:
    def __init__(self,title='AssignSpace'):
        from frontend.webapp import WebApp
        self.graphs    = []
        self.editables = []
        self.scopes    = {}
        self.app = WebApp(self)


    def graph(self,*args,controllable=False,f__frame=3):
        for arg in args:
            if hasattr(arg,'shape') and len(arg.shape) != 1:
                raise ValueError('Arg is not a 1D array')
            elif not isinstance(arg,(int,float)):
                raise ValueError('space.graph only supports scalars and 1D-Array/Tensors for now')

        names = [Name(var,f__frame+1) for var in args]
        for scope in inspect.getouterframes(names[0].frame):
            n = '> '+' > '.join(names[0].frame.f_code.co_filename.split('/')[-2:]) + ':' + str(names[0].frame.f_code.co_name)
            self.scopes[id(scope)] = [scope,n]
        self.graphs.append(names)
        if controllable:
            self.editables.append(names)
        self.app.new_card(names,graph=not controllable)
        return names


    def control(self,*var):
        return self.graph(*var,controllable=True,f__frame=4)


    # def save_state(self,file='/'):
    #     frame_traceback = []
    #     frame = inspect.currentframe().f_back
    #     b_frame = frame
    #
    #     stack = inspect.stack()
    #
    #     try:
    #         while True:
    #             frame_traceback.append(frame)
    #             frame = frame.f_back
    #     except AttributeError:
    #         ...
    #     frame_traceback = frame_traceback[:-1]

        # print(
        # run_recovery(stack,frame_traceback)

        # print([t.f_locals for t in ])

        ...






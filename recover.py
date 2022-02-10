import VM
import inspect
import __main__

def indents_in(v):
    for x,val in enumerate(v):
        if not val == ' ':
            return x
    return 0

def get_block(ln,file):
    # print(file)
    i = indents_in(file[ln-1])
    # print(file[ln-1])

    x = 0

    for x,v in enumerate(file[ln:]):

        if indents_in(v) <= i:
            return x


def run_recovery(stack:inspect.stack(),frame_traceback):
    # print(__main__.__code__)
    exit()
    with open(stack[1].filename) as f:
        file = f.read().split('\n')


    ln = [tb.f_code.co_firstlineno for tb in frame_traceback]
    scopes = [tb.f_locals for tb in frame_traceback]

    # print('s',v)
    x = 0


    i = indents_in(file[ln[x]-1])
    i2 = indents_in(file[ln[x]])
    # print(file[ln[x]+1])
    # print('l',file[stack[1].lineno])

    # print('x',)

    mr = file[ln[x]:(get_block(ln[x],file)+ln[x])]
    mr = ''.join([x[i2:]+'\n' for x in mr])
    state = VM.run(mr,scopes)

    # print(frame_traceback[-1].)

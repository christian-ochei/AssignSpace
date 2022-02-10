from threading import Thread
from random import randint
import eel
import os

class AppSocket:
    def __init__(self):
        ...

# def add

@eel.expose
def jprint(x):
    print('print:',x)

def runsocket(webapp):
    path = ''.join([x + '\\' for x in __file__.split('\\')[:-1]])
    eel.init(path)
    eel.start('main.html', block=False,title='')
    socket = AppSocket()

    @eel.expose
    def keypress(x,KEYID):
        if x in webapp.KEYPRESS[:KEYID*2]:
            print('j',webapp.parent.editables)
            idx = webapp.KEYPRESS.index(x)
            names = webapp.parent.editables[idx//2]
            if idx%2 == 0:
                [name.set(name()+0.001) for name in names]
            else:
                [name.set(name()-0.001) for name in names]

    # Live graphing

    while True:
        for x,names in enumerate(webapp.parent.graphs):
            n = [name() for name in names]
            if hasattr(names[0](),'__iter__'):
                ...
                n = [n.tolist() for n in n]
                # print('n',n)
            # else:
            eel.append_at_idx(x,n)

        if randint(0,20) == 1:
            eel.updatescopes(webapp.parent.scopes)

        eel.sleep(0.05)

class WebApp:
    def __init__(s,parent):

        s.KEYPRESS = 'zxcvbnm,./asdfghjkl;qwertyuiop[]1234567890'
        s.INCREMENT = s.KEYPRESS[::2]
        s.DECREMENT = s.KEYPRESS[1::2]

        # s.INCREMENT_CODE = s.INCREMENT
        # s.DECREMENT_CODE = s.DECREMENT

        s.parent = parent
        Thread(target=runsocket,args=(s,)).start()
        eel.sleep(0.3)


    def new_card(s,names,graph=True):
        x = [name() for name in names]
        if not hasattr(x[0], '__iter__'):
            eel.emplace_card('scalar',graph,x,[str(name.name) for name in names],[s.INCREMENT,s.DECREMENT])
        else:
            eel.emplace_card('tensor',graph,x,[str(name.name) for name in names],[s.INCREMENT,s.DECREMENT])
        #
        #


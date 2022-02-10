def run(mr,scopes):
    mr = mr.replace('return','__r__return__v__ = ')
    # print(scopes)
    # print(mr)
    # print(compile(mr,'','exec'))


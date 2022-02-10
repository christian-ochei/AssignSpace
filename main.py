import numpy as np
import torch.nn as nn
import torch.optim

from AssignSpace import AssignSpace


# Run interface with on simple call
space = AssignSpace()

var = 40
h = 30

# space.graph is able to get its parameters and their corresponding names / addresses in its input scope
# space.graph only supports scalars and 1D-Array/Tensors for now
# Make sure the underlying type or array length doesn't change in throughout the process.
space.graph(var)
space.graph(h)


def some_numpy_maths(array):
    array = array-np.random.random(array.shape)
    space.graph(h)


dummy_net = nn.Sequential(*[nn.Sequential(nn.Linear(20,20),nn.Tanh()) for _ in range(10)])
optim = torch.optim.Adam(dummy_net.parameters(),lr=0.3)
criterion = nn.MSELoss()

while True:
    # The incrementation will be shown live on its GUI
    var+=0.000001

    # also, numpy operations
    some_numpy_maths(np.zeros(100))
    z = dummy_net(torch.randn(20))

    # Watch dummy_net fit to torch.ones(...) in realtime
    space.graph(z) # equivalent to space.graph("z")
    loss = criterion(z,torch.ones(20))
    loss.backward()
    optim.step()
    optim.zero_grad()



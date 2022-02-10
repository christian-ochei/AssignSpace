# AssignSpace

AssignSpace is a small framework I built for plotting numeric objects in real time asynchronously. This framework currently supports scalars and 1D Tensors but its purpose should extend in the future.

Assign space is currently in development and does not have many functionalities.

### What you can do with AssignSpace.

#### -  Plot your model’s loss in realtime

All you have to do is 

```python

Import assignspace

app = assignspace.AssignSpace()

…. 

while training:

	….

	app.graph(loss)

```

Everything else gets taken care of in realtime.





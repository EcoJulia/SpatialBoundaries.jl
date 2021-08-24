# # Triangulation wombling

using SpatialBoundaries
using StatsPlots

# Plot defaults

default(; dpi=500, size=(600, 600), aspectratio=1, c=:davos, frame=:box)

# Get some points at random

n = 120
x = rand(n)
y = rand(n)
z = [sqrt((x[i]-0.5)^2.0)<0.15 ? rand() : rand()+0.7 for i in eachindex(x)]

scatter(x, y, marker_z = z, lab="")

# Womble

W = wombling(x, y, z)

# Get the rate of change

scatter(x, y, c=:lightgrey, msw=0.0, lab="", m=:square, ms=3)
scatter!(W.x, W.y, marker_z = W.m, lab="")

# Show the direction of change

angl = (W.θ ./ 360).*2π .- π
lng = log1p.(W.m)
lng = lng ./ maximum(lng)

u = [lng[i]*cos(angl[i]) for i in eachindex(angl)]
v = [lng[i]*sin(angl[i]) for i in eachindex(angl)]

quiver(W.x, W.y, quiver=(u, v), c=:grey)
scatter!(W.x, W.y, marker_z = W.m, lab="")
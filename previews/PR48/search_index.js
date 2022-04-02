var documenterSearchIndex = {"docs":
[{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"EditURL = \"https://github.com/EcoJulia/SpatialBoundaries.jl/blob/main/docs/src/vignettes/introduction.jl\"","category":"page"},{"location":"vignettes/introduction/#Introduction","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"Broadly the Wombling algorithm traverses a 'landscape' (for example species richness at different degree squares) and describes the the landscape in terms of the Rate of Change (m) (think slope/gradient) and Direction of Change (θ) (direction of slope). A high-level overview is roughly outlined in the figure below –- note that m is concerned with the differnece/variation between the points in the window and θ with the direction of the the slope.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"(Image: image info)","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"Both rate and direction of change are calculated by interpolating points in a given search window which (depending on how the points are arranged in space), can be done in two ways.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"Lattice Wombling: For points that are regularly arranged in space the search window is 2 × 2 points.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"Triangulation Wombling: For points that irregularly arranged in space nearest neigbours are found using delaunay triangualtion and interpolation is between 3 points.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"In this example, we will see how the SpatialBoundaries.jl package works (as well as interpreting the rates and direction of change), by taking a random mid-point displacement landscape, and measuring its rate and direction of change.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"using SpatialBoundaries\nusing NeutralLandscapes\nusing StatsPlots","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"We will set a few options for the default plots:","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"default(; dpi=500, size=(600, 600), aspectratio=1, c=:davos, frame=:box)","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"The landscape generation is done using the NeutralLandscapes package, and we will pick a 500x500 grid:","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"landscape_size = (500, 500)\nlandscape = rand(MidpointDisplacement(0.75), landscape_size...)","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"By default, lattice wombling will assume that the cells have the same size, which is 1/n (where n is the number of cells on each side), but  you can specify your own x and y arguments.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"We can take a quick peek at the landscape:","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"heatmap(landscape)","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"Getting the lattice wombling is done with","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"W = wombling(landscape);\nnothing #hide","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"The resulting LatticeWomble object has fields for the rate of change (m), the direction of change in degrees (θ), and the values of the centers of the cells at x and y (note that the grid of rates of change is one cell smaller than the original grid!). These points are in a grid so the Lattice Wombling function was used - note that wombling() will select the appropriate algorithm based on data input.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"Let's have a look at the rate of change:","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"heatmap(W.m, c=:tokyo, clim=(0, maximum(W.m)))","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"The rate of change informs us on the potential for there to be a boundary (zone of change) within a window. Cells with a high rate of change are indicative of large differences (changes) in the landscape 'topology' and are suggestive of a boundary as we shift from one 'state' to another.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"The direction of change is also given, and is expressed a wind direction; for instance, an angle of 180° means that the value is smaller in the South, and larger in the North:","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"heatmap(W.θ, c=:romaO, clim=(0., 360.))","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"The direction of change is not the direction the boundary would be if you were to draw it on the landscape but rather the direction the rate of change is 'moving in'. This means it is possible to think of and use the direction of change independently of calculating boundaries per se and can be used to inform how the landscape is behaving/changing in a more 'continuous' way as opposed to discrete zones/boundaries. For example if changes in species richness are more gradual (rate of change is near constant) but the the direction of change is consistently South-North (i.e. 180°) we can still infer that species richness is 'uniformly' increasing in a South-North direction.","category":"page"},{"location":"vignettes/introduction/","page":"Introduction","title":"Introduction","text":"A note on outputs: The new x and y co-ordinates correspond to latitude and longitude respectively.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"EditURL = \"https://github.com/EcoJulia/SpatialBoundaries.jl/blob/main/docs/src/vignettes/simplesdmlayers.jl\"","category":"page"},{"location":"vignettes/simplesdmlayers/#Integration-with-SimpleSDMLayers","page":"SDM Layers","title":"Integration with SimpleSDMLayers","text":"","category":"section"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"The SpatialBoundaries package works really well with SimpleSDMLayers, so that you can (i) apply wombling and boundaries finding to a SimpleSDMLayer object, and (ii) convert the output of a Womble object to a pair of SimpleSDMLayer corresponding to the rate and direction of change.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"using SimpleSDMLayers\nusing SpatialBoundaries\nusing StatsPlots","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"Note that the warning about dependencies is a side-effect of loading some functionalities for SimpleSDMLayers as part of SpatialBoundaries, and can safely be ignored.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"In this example, we will look at temperature data over North America, and measure the rate of change, as well as the direction of it. These data are extracted from the WorldClim database.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"temperature = SimpleSDMPredictor(\n    WorldClim, BioClim, 1; left=-130.0, right=-65.0, bottom=5.0, top=65.0\n)","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"We can have a look at this layer, after setting a few defaults:","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"default(; dpi=500, size=(600, 600), aspectratio=1, c=:davos, frame=:box)\nplot(temperature)","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"There is an overload of the wombling method for SDM layers, so we can call it directly – this method might result in a bit more memory usage than expected, as it requires to transform the nothing values into NaNs, which in turn might require to convert the inner elements of the layer grid.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"W = wombling(temperature)","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"By default, this returns a LatticeWomble. Let's look at the direction of change – mapping this information is difficult, so we will focus on the","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"stephist(\n    deg2rad.(sort(vec(W.θ)));\n    proj=:polar,\n    lab=\"\",\n    c=:teal,\n    fill=(0, 0.2, :teal),\n    nbins=100,\n)","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"The values for the direction of change are concentrated around 180° - note that the direction of change is reported as a wind direction, meaning that values tend to increase on a south-north axis.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"We can also map the rate of change. This is far easier to do with a proper SDM layer, so we will convert the wombling output:","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"Lr, Ld = SimpleSDMPredictor(W)","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"Note that we do not use convert here, because this call returns two layers in a tuple – this is a slight deviation from what we expect with SimpleSDMLayers, but it makes the code a little easier to write, and so is considered an acceptable trade-off.","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"plot(Lr)","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"With the Ld layer storing the direction of change, we can do a map - the main issue with mapping directions is colors, which need to have the same begin and endpoint, while remaining accessible to people with color vision defficiencies. Cyclic color schemes work for this purpose:","category":"page"},{"location":"vignettes/simplesdmlayers/","page":"SDM Layers","title":"SDM Layers","text":"plot(Ld, c=:brocO, clim=(0, 360))","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"EditURL = \"https://github.com/EcoJulia/SpatialBoundaries.jl/blob/main/docs/src/vignettes/boundaries.jl\"","category":"page"},{"location":"vignettes/boundaries/#Finding-boundaries","page":"Finding boundaries","title":"Finding boundaries","text":"","category":"section"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"The output of a wombling operation can be used to pick boundaries, i.e. areas where the values on the grid transition sharply. We will illustrate this with a simple example of a three-patch landscape.","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"using SpatialBoundaries\nusing StatsPlots\ndefault(; dpi=500, size=(600, 600), aspectratio=1, c=:batlow, frame=:box)","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"Let's create a landscape with two values:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"A = rand(Float64, 200, 150);\nA[1:80, 1:85] .+= 5.0;\nA[110:end, 130:end] .+= 3.0;\nnothing #hide","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"We can check out what this landscape looks likes:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"heatmap(A)","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"We can apply wombling to this landscape, assuming that all cells have the same size:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"W = wombling(A);\nnothing #hide","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"Let's look at the rate of change:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"heatmap(W.m; c=:nuuk)","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"Picking the boundaries is done by passing the wombling output to the boundaries function, with a specific threshold giving the proportion of points that should be retained as part of the boundaries. Checking what the effect of this threshold is would be a good idea:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"thresholds = LinRange(0.0, 0.2, 200)\npatches = [length(boundaries(W, t)) for t in thresholds]\n\nplot(thresholds, log1p.(patches), aspectratio=:none)\nxaxis!(\"Threshold\", (0., 0.2))\nyaxis!(\"log(boundary patches + 1)\", (0., 9.))","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"Let's eyeball this as a 0.01, and see how the patches are distributed.","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"Another way we can look at the boundaries is to see when a patch is considered to be a boundary. To do so we will create an empty matrix, and fill each position with the lowest threshold at which it is considered to be a boundary:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"b = similar(W.m)\n\nfor t in reverse(LinRange(0.0, 1.0, 200))\n    b[boundaries(W, t)] .= t\nend\n\nheatmap(b, c=:tofino, clim=(0,1))","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"This also suggests that we will get well delineated patches for low values of the threshold.","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"B = boundaries(W, 0.01);\nnothing #hide","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"In the following figure, cells identified as candidate boundaries are marked in white:","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"heatmap(A)\nscatter!([(reverse(x.I)) for x in B], leg=false, msw=0, c=:white)","category":"page"},{"location":"vignettes/boundaries/","page":"Finding boundaries","title":"Finding boundaries","text":"We can see that the boundaries of the patches have been well identified!","category":"page"},{"location":"#SpatialBoundaries.jl","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.jl","text":"","category":"section"},{"location":"","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.jl","text":"Documentation for SpatialBoundaries.jl","category":"page"},{"location":"#Core-functions","page":"SpatialBoundaries.jl","title":"Core functions","text":"","category":"section"},{"location":"","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.jl","text":"wombling\nboundaries","category":"page"},{"location":"#SpatialBoundaries.wombling","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.wombling","text":"wombling(x::Vector{T}, y::Vector{T}, z::Vector{T}) where {T<:Number}\n\nWrapper function that implements the triangulation wombling algorithm for points that are irregularly arranged in space.\n\n\n\n\n\nwombling(x::Vector{T}, y::Vector{T}, z::Matrix{T}) where {T<:Number}\n\nWrapper function that implements the lattice wombling algorithm for points that are regularly arranged in space. Note that the matrix is presented in a way that is flipped, i.e. the x coordinates corresponds to the rows, and the y coordinates correspond to the columns. If you want to think of x and y as geographic coordinates, y are the longitudes, and x are the latitudes. Using the bindings for SimpleSDMLayers, this conversion will be performed automatically.\n\n\n\n\n\nwombling(m::Matrix{T}) where {T<:Number}\n\nShortcut to womble a matrix (using lattice wombling) when no x and y positions are given - the cell size in each dimension is expected to be 1.\n\n\n\n\n\n","category":"function"},{"location":"#SpatialBoundaries.boundaries","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.boundaries","text":"boundaries(W::Womble, t=0.1; ignorezero=false)\n\nExtracts candidate boundaries using calculated wombling object W on specified threshold t. Default threshold is 0.1, meaning that the top 10% of pixels are selected as part of the boundaries. This function returns a list of indices identifying which simplices are part of the boundaries. The NaN values in the rates of change are not going to be a part of the boundaries. The keyword ignorezero, which defaults to false, can be used to remove the points with a rate of change of 0.\n\n\n\n\n\n","category":"function"},{"location":"#Types","page":"SpatialBoundaries.jl","title":"Types","text":"","category":"section"},{"location":"","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.jl","text":"LatticeWomble\nTriangulationWomble\nWomble","category":"page"},{"location":"#SpatialBoundaries.LatticeWomble","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.LatticeWomble","text":"LatticeWomble{T <: Number} <: Womble\n\nA set of data (and co-ordinates) that are regularly arranged in space are of type LatticeWomble after having been passed through wombling - the fields in this type are\n\nm, a matrix of rate of change at each (x,y) co-ordinate\nθ, a matrix of direction of change at each (x,y) co-ordinate\nx and y, the coordinates of the center of each cell\n\nNote that the type of x and y should be the same as the element type of m and θ, because these values are all used when calculating the rate of change and that x and y correspond to latitude and longitude respectively.\n\n\n\n\n\n","category":"type"},{"location":"#SpatialBoundaries.TriangulationWomble","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.TriangulationWomble","text":"TriangulationWomble{T <: Number} <: Womble\n\nA set of data (and co-ordinates) that are irregularly arranged in space are of type TriangulationWomble after having been passed through wombling - the fields in this type are\n\nm, a vector of rate of change at each (x,y) co-ordinate\nθ, a vector of direction of change at each (x,y) co-ordinate\nx and y, the coordinates of the barycenter of each triangle in the plan\n\nNote that the type of x and y should be the same as the element type of m and θ, because these values are all used when calculating the rate of change and that x and y correspond to latitude and longitude respectively.\n\n\n\n\n\n","category":"type"},{"location":"#SpatialBoundaries.Womble","page":"SpatialBoundaries.jl","title":"SpatialBoundaries.Womble","text":"Womble\n\nThe Womble abstract type is a catch-all for specific wombling outputs.\n\n\n\n\n\n","category":"type"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"EditURL = \"https://github.com/EcoJulia/SpatialBoundaries.jl/blob/main/docs/src/vignettes/triangulation.jl\"","category":"page"},{"location":"vignettes/triangulation/#Triangulation-wombling","page":"Triangulation wombling","title":"Triangulation wombling","text":"","category":"section"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"using SpatialBoundaries\nusing StatsPlots","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"Plot defaults","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"default(; dpi=500, size=(600, 600), aspectratio=1, c=:davos, frame=:box)","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"Get some points at random","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"n = 500\nx = rand(n)\ny = rand(n)\nz = [(x[i]<=0.5)&(y[i]<=0.5) ? rand() : rand().+1.2 for i in eachindex(x)]\n\nscatter(x, y, marker_z = z, lab=\"\")","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"Womble","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"W = wombling(x, y, z)","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"Get the rate of change","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"scatter(x, y, c=:lightgrey, msw=0.0, lab=\"\", m=:square, ms=3)\nscatter!(W.x, W.y, marker_z = log1p.(W.m), lab=\"\")","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"Angle histogram","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"stephist(\n    deg2rad.(sort(vec(W.θ)));\n    proj=:polar,\n    lab=\"\",\n    c=:teal,\n    fill=(0, 0.2, :teal),\n    nbins=100,\n)","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"Show the rotation with a color","category":"page"},{"location":"vignettes/triangulation/","page":"Triangulation wombling","title":"Triangulation wombling","text":"scatter(W.x, W.y, marker_z = W.θ, c=:vik, clim=(0, 360))","category":"page"}]
}

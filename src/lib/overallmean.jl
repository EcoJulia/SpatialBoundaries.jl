"""
    mean(w::Vector{T}) where {T <: LatticeWomble}

Overall Mean Wombling Value, as in Fortin 1994

"""
function mean(w::Vector{T}) where {T<:LatticeWomble}
    # Check that all wombles have the same dimensions and coordinates
    @assert all([w1.x == w2.x for w1 in w, w2 in w])
    @assert all([w1.y == w2.y for w1 in w, w2 in w])
    @assert all([size(w1.m) == size(w2.m) for w1 in w, w2 in w])
    # Prepare the matrices
    m = fill(NaN, size(w[1].m))
    α = fill(NaN, size(w[1].m))
    # Fill the matrices
    for _idx in eachindex(w[1].m)
        ch = filter(!isnan, [womble.m[_idx] for womble in w])
        di = filter(!isnan, [deg2rad(womble.θ[_idx]) for womble in w])
        if !isempty(ch)
            m[_idx] = mean(ch)
            α[_idx] = atan(mean(sin.(di)), mean(cos.(di)))
        end
    end
    average_direction = rad2deg.(α) .+ 180.0
    return LatticeWomble(m, average_direction, w[1].x, w[1].y)
end

"""
    mean(w::Vector{T}) where {T <: TriangulationWomble}

"""
function mean(w::Vector{T}) where {T<:TriangulationWomble}
    # Check that all wombles have the same dimensions and coordinates
    @assert all([w1.x == w2.x for w1 in w, w2 in w])
    @assert all([w1.y == w2.y for w1 in w, w2 in w])
    @assert all([size(w1.m) == size(w2.m) for w1 in w, w2 in w])
    # Prepare the matrices
    m = fill(NaN, size(w[1].m))
    α = fill(NaN, size(w[1].m))
    # Fill the matrices
    for _idx in eachindex(w[1].m)
        ch = filter(!isnan, [womble.m[_idx] for womble in w])
        di = filter(!isnan, [deg2rad(womble.θ[_idx]) for womble in w])
        if !isempty(ch)
            m[_idx] = mean(ch)
            α[_idx] = atan(mean(sin.(di)), mean(cos.(di)))
        end
    end
    average_direction = rad2deg.(α) .+ 180.0
    return TriangulationWomble(m, average_direction, w[1].x, w[1].y)
end
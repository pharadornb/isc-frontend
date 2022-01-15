function Grid(props){
    const { children } = props
    return(
        <div class="row justify-content-md-center" id="grid-box">
            { children }
        </div>
    )
}

export default Grid;
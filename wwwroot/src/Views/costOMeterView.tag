
<costOMeterView>
    <h3>Resources</h3>
      <ul>
        <li each={ opts.viewModel.consultants }>
            <label> Name: { name } </label>
            <label> Price: { hourlyCost } </label>
            <label> Cost: { getTotalCostFormatted() } </label>
            <a onclick="{start}">start</a>
            <a onclick="{pause}">pause</a>
            <a onclick="{parent.remove}">remove</a>
        </li>
  </ul>
    <form onsubmit={ add }>
        <input ref="inputName" onkeyup={ editName }>
        <input ref="inputCost" onkeyup={ editCost }>
        <button>Add</button>
    </form>
    <button onclick={ runCalc }>Run</button>
    <button onclick={ stopCalc }>Pause</button>
    <label>Cost: { opts.viewModel.getTotalCost() }</label>
    <label>Total hourly: { opts.viewModel.getTotalHourlyCost() }</label>
  <script>

    remove(e) {
        opts.viewModel.removeConsultant(e);
        this.update();
    }

    runCalc(e) {
        opts.viewModel.startCalculator();
    }

    stopCalc(e) {
        opts.viewModel.stopCalculator();
    }

    editName(e) {
        this.newName = e.target.value
    }

    editCost(e) {
        this.newCost = e.target.value
    }

    add(e) {
      e.preventDefault()
      opts.viewModel.addConsultant(this.newName, this.newCost)
      this.update();
    }

    this.on('mount', function () {
        console.log('Tag mounted');
        opts.viewModel.onTick = () => {
            this.update();
        }
    })
  </script>


</costOMeterView>

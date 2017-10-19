
<costOMeterView>
    <h3>Consultants!</h3>
      <ul>
        <li each={ opts.viewModel.consultants }>
            <label> Name: { name } </label>
            <label> Price: { hourlyCost } </label>
        </li>
  </ul>
    <form onsubmit={ add }>
        <input ref="inputName" onkeyup={ editName }>
        <input ref="inputCost" onkeyup={ editCost }>
        <button>Add</button>
    </form>
    <button onclick={ runCalc }>Run</button>
    <button onclick={ stopCalc }>Pause</button>
    <label>Cost: { opts.viewModel.totalCost }</label>
    <label>Total hourly: { opts.viewModel.totalHourlyCost }</label>
  <script>

    runCalc(e) {
        opts.viewModel.run();
    }

    stopCalc(e) {
        opts.viewModel.stop();
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
        opts.viewModel.updated = () => {
            this.update();
        }
    })
  </script>


</costOMeterView>


<costOMeterView>
    <h3>Resources</h3>
      <ul class="list-group">
        <li class="list-group-item justify-content-between" each={ opts.viewModel.consultants }>
            { name }
            <span class="badge badge-default badge-pill">{ hourlyCost } kr / h</span>
            <span class="badge badge-default badge-pill">{ getTotalCostFormatted() } kr</span>
            <button type="button" class="btn btn-outline-primary" onclick={start}>start</button>
            <button type="button" class="btn btn-outline-secondary" onclick={pause}>pause</button>
            <button type="button" class="btn btn-outline-danger" onclick={parent.remove}>remove</button>
        </li>
  </ul>
    <div class="d-flex p-2">    
    <form onsubmit={ add }>
        <input id="inputName" placeholder="Name" />
        <input id="inputCost" placeholder="Cost per hour" type="number" />
        <button>Add</button>
    </form>
    </div>
    <div class="d-flex p-2">
        <button type="button" class="btn btn-outline-primary btn-space" onclick={ runCalc }>Run</button>
        <button type="button" class="btn btn-outline-secondary btn-space" onclick={ stopCalc }>Pause</button>
        <label>Cost: { opts.viewModel.getTotalCost() }</label>
        <label>Total hourly: { opts.viewModel.getTotalHourlyCost() }</label>
    </div>
  <script>

    remove(e) {
        opts.viewModel.removeConsultant(e.item);
        this.update();
    }

    runCalc(e) {
        opts.viewModel.startCalculator();
    }

    stopCalc(e) {
        opts.viewModel.stopCalculator();
    }

    add(e) {
      e.preventDefault()
      
      let name = $('#inputName').val();
      let cost = $('#inputCost').val();

      opts.viewModel.addConsultant(name, cost)

      $('#inputName').val('');
      $('#inputCost').val('');

      this.update();
    }

    this.on('mount', function () {
        console.log('Tag mounted');
        opts.viewModel.onTick = () => {
            riot.update();
        }
    })

  this.on('update', function() {
    //console.log('Tag updating');
  })

  </script>


</costOMeterView>

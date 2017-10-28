
<costOMeterView>
<div class="center-content">
      <ul class="list-group bg-black">
        <li class="list-group-item justify-content-between bg-black" each={ opts.viewModel.consultants }>
            <span>{ name }</span>
            <span style="float: right; margin: 10px;">{ hourlyCost } kr / h</span>
            <span style="float: right; margin: 10px;">{ getTotalCostFormatted() } kr</span>
            <!--  <button type="button" class="btn btn-outline-primary" onclick={start}>start</button>
            <button type="button" class="btn btn-outline-secondary" onclick={pause}>pause</button>  -->
            <button type="button" class="btn btn-outline-danger clickable" onclick={parent.remove}>remove</button>
        </li>
  </ul>
    <div class="d-flex p-2">    
    <form onsubmit={ add }>
        <input id="inputName" placeholder="Name" required />
        <input id="inputCost" placeholder="Cost per hour" type="number" required />
        <button class="btn btn-default  clickable">Add</button>
    </form>
    </div>
</div>

  <script>

    remove(e) {
        opts.viewModel.removeConsultant(e.item);
        riot.update();
    }

    add(e) {
      e.preventDefault()
      
      let name = $('#inputName').val();
      let cost = $('#inputCost').val();

      opts.viewModel.addConsultant(name, cost)

      $('#inputName').val('');
      $('#inputCost').val('');

      riot.update();
    }

    this.on('mount', function () {
        console.log('Body mounted');
        opts.viewModel.onTick = () => {
            riot.update();
        }
    })

  this.on('update', function() {
    //console.log('Tag updating');
  })

  </script>


</costOMeterView>

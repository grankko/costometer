
<costOMeterView>
<div class="center-content">
      <ul class="list-group bg-black">
        <li class="list-group-item justify-content-between bg-black" each={ opts.viewModel.consultants }>
            <span>{ name }</span>
            <span style="float: right; margin: 10px;">{ hourlyCost } kr / h</span>
            <span style="float: right; margin: 10px;">{ getTotalCostFormatted() } kr</span>
            <!--  <button type="button" class="btn btn-outline-primary" onclick={start}>start</button>
            <button type="button" class="btn btn-outline-secondary" onclick={pause}>pause</button>  -->
            <a href="#" onclick = { parent.remove }>
                <img src="img/del.png" alt="delete" style="height: 50px;" />
            </a>
        </li>
  </ul>
    <div>    
        <input id="inputName" placeholder="Name" required />
        <input id="inputCost" placeholder="Cost per hour" type="number" required />
        <a href="#" onclick = { add }>
            <img src="img/add.png" alt="delete" style="height: 50px;" />
        </a>
    </div>
</div>

  <script>

    remove(e) {
        opts.viewModel.removeConsultant(e.item);
        riot.update();
    }

    add(e) {
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

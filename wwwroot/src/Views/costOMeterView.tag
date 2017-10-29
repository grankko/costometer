
<costOMeterView>
<div class="center-content container">
        <div each={ opts.viewModel.consultants }>
            <div class="row align-items-center">
                <div class="col-10">
                    <span class="lead">{ name }</span>
                </div>
                <div class="col-2">
                    <a href="#" onclick={ remove }>
                        <img src="img/del.png" alt="delete resource" style="height: 50px; float: right;" />
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    { hourlyCost } kr / h
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    { getTotalCostFormatted() } kr
                </div>
            </div>            
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col-10 align-items-center">
                <input id="inputName" placeholder="Name" style="width: 100%" />
                <input id="inputCost" placeholder="Cost per hour" type="number" style="width: 100%" />
            </div>
            <div class="col-2 align-items-center">
                <a href="#" onclick={ add }>
                    <img src="img/add.png" alt="add resource" style="height: 50px; float: right;" />
                </a>
            </div>
        </div>
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

      if (!isEmptyOrSpaces(name) && !isEmptyOrSpaces(cost)) {
        let consultant = opts.viewModel.addConsultant(name, cost)

        if (opts.viewModel.getIsRunning()) {
            consultant.start();
        }

        $('#inputName').val('');
        $('#inputCost').val('');
      }

      riot.update();
    }

    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
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

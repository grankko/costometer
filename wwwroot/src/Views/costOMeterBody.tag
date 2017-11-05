
<costOMeterBody>
  <div class="center-content container">
          <div each={ opts.viewModel.consultants }>
              <div class="row align-items-center">
                  <div class="col-10">
                      <span class="lead">{ name }</span>
                  </div>
                  <div class="col-2">
                      <a href="javascript:void(0)" onclick={ remove }>
                          <img src="img/del.png" alt="delete resource" class="del-button" />
                      </a>
                  </div>
              </div>
              <div class="row">
                  <div class="col-5 toned-down">
                      { hourlyCost } {opts.viewModel.currency} / h
                  </div>
                  <div class="col-7 toned-down">
                      { getTotalCostFormatted() } {opts.viewModel.currency}
                  </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Load modal elements -->
  <addResourceModal></addResourceModal>
  <resetConfigurationModal></resetConfigurationModal>
  <loadConfigurationModal></loadConfigurationModal>
  <saveConfigurationModal></saveConfigurationModal>
  <setCurrencyModal></setCurrencyModal>

  <script>

    remove(e) {
        opts.viewModel.removeConsultant(e.item);
        riot.update();
    }

    this.on('mount', function () {
        console.log('costOMeterBody mounted');

        if (!supportFormData()) {
          $('#saveLinkButton').hide();
          $('#saveLinkButtonImage').hide();
          $('#loadFromFileButton').hide();
        }

        opts.viewModel.onTick = () => {
            riot.update();
        }
    })

  </script>
</costOMeterBody>

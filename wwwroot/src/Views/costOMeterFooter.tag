<costOMeterFooter>
    <div>
        <div style="float: right;">
            <span style="margin: 10px;">Cost: { opts.viewModel.getTotalCost() } kr</span>
            <span style="margin: 10px;">Total hourly: { opts.viewModel.getTotalHourlyCost() } kr / h</span>
        </div>
        <div>        
            <button type="button"
                    class={opts.viewModel.getIsRunnable() ? 'btn btn-default btn-space clickable' : 'btn btn-default btn-space disabled  clickable' }
                    onclick={runCalc}
                     id="runButton">run</button>
            <button type="button"
                    class={opts.viewModel.getIsPausable() ? 'btn btn-default btn-space  clickable' : 'btn btn-default btn-space disabled  clickable' }
                    onclick={stopCalc}
                    id="pauseButton">pause</button>                    
        </div>
    <script>
        runCalc(e) {
            opts.viewModel.startCalculator();
        }

        stopCalc(e) {
            opts.viewModel.stopCalculator();
        }

        this.on('mount', function () {
            console.log('Footer mounted');
            riot.update();
        });

    </script>
</costOMeterFooter>
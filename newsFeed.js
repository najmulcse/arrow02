;

(function( $, window, document, undefined ){

    let pluginName = 'newsFeed';
    let defaultParameters = {
        speed: 300,
        direction: 'left',
        duration:2000,
        row_height: 25,
        pauseOnHover: 1,
        autoStart: 1,
        max_row : 3,
        // function 
        start: function(){},
        stop: function(){},
        pause: function(){},


    }

    $.fn[pluginName] = function(argumentList){
        let args = arguments;
       return this.each(function(){
            let $this = $(this);
            let data  = $.data(this,'plugin_'+pluginName);
            let argumentLists = typeof argumentList === 'object' && argumentList;
            if(!data){
                $this.data('plugin_'+pluginName,new pluginRun(this, argumentLists));

            }
            if( typeof argumentList === 'string' ){
                data[argumentList].apply(data, Array.prototype.slice.call(args, 1));
            }
        });
    }

    function pluginRun(selector, parameters){
        this.selector = selector;
        this.$selector = $(selector);
        this.parameters = $.extend({},defaultParameters,parameters);
        this.state = 0;
        this.moveInterval;
        if(this.$selector.is('ul,li')){
                this.initialize();
        }

    }

    pluginRun.prototype ={

        initialize: function(){
        
            this.$selector.height(this.parameters.row_height * this.parameters.max_row).css({
                overflow: 'hidden'
            });
            if(this.parameters.autoStart){
               this.start(); 
            }
        },

        start: function(){
           if(! this.state ){
               this.state = 1;
               this.resetInterval();
               this.parameters.start();
           }
        },
        resetInterval: function(){
            if(this.state){
                clearInterval(this.moveInterval);
                this.moveInterval = setInterval( function(){
                    this.move()
                }.bind(this),this.parameters.duration);
            }
        }
    }

})(jQuery, window, document);
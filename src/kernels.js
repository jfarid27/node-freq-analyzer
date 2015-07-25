(function(){

    if ( typeof define !== 'function') {
        var define = require("amdefine")(module)
    } 

    define(function(){

        return function(metric){

            var exports = function(){
                return
            }

            exports.freqGenerator = function(data, kernel, window, dimension){

                var size = data.length
                var windowCoefficient = Math.pow(window, -dimension)

                return function(x){

                    var summation = data.reduce(function(sum, obs){

                        return sum + kernel( metric(obs, x) / window)

                    }, 0)

                    return (1 / size) * windowCoefficient * summation 

                }

            }

            exports.kernel = {}  

            exports.kernel.gaussian = function(x){

                return Math.pow(2*Math.PI, -.5) * Math.exp( Math.pow(x, 2) * -.5)

            }

            exports.kernel.laplace = function(x){

                return .5 * Math.exp( -Math.abs(x) )

            }

            exports.kernel.epanechnikov = function(x){

                return .75 * Math.max(0, 1 - Math.pow(x, 2) )

            }
            
            return exports
        }
    })

})()

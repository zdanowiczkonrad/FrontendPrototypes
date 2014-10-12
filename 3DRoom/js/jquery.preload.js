
jQuery(document).ready(function(){

        $.fn.image = function(src, f){
        return this.each(function(){
                var i = new Image();
                        i.src = src;
                        i.onload = f;
                        this.appendChild(i);
                });
        }
});
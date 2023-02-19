$('#burger').on('click', function(){
    $('#vertnav').slideToggle()
})


window.addEventListener("resize", function(event) {
    if(document.body.clientWidth >= 800){

        // $('#voile').fadeOut(50)
        $('#vertnav').slideUp()
    }
})

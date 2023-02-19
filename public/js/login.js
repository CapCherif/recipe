

$('#form_auth').submit((e)=>{

    e.preventDefault()

    var username = $('#username').val()
    var password = $('#password').val()

    if(username == "eng-rawan" && password == "ing123"){
        $('.success').slideDown()
        setTimeout(() => {
            $('.success').slideUp()
            $('#manage').show()
            // loading

            $.ajax({
                type:"POST",
                url:"/getlisting",
                success:(res)=>{
                    $('#form_auth').hide()
                    BuildMeal(res.meals)
                    $('#listing span').remove()
                }
            })
        }, 2000);
    }
    else{
        $('.err').slideDown()
        setTimeout(() => {
            $('.err').slideUp()
        }, 2000);
    }
})



const BuildMeal = (meals)=>{

    if(meals.length != 0){

    var t = ''
    meals.forEach(element => {
        
        
        t += `

        <div class="meal">
            <div class="h3"><i class="fas fa-trash" onclick="DeleteMeal(${element.id})"></i>${element.title}</div>
            
        </div>

        `
    });

    $('#res').html(t)
    // AttachEventSlider()
    }
    else{
        $('#res').html("<p>No meal.</p>")
    }

}



$('.add').submit(function(e){
    e.preventDefault()

    var title = $('#title').val().trim()
    var ings = $('#ings').val().trim().split('\n')

    $.ajax({
        type:'POST',
        url:"/addmeal",
        data:{title, ings},
        success:(res)=>{
            BuildMeal(res.meals)
            $('#title').val('')
            $('#ings').val('')
            $('.success').slideDown()
            setTimeout(() => {
                $('.success').slideUp()
            }, 2000);
        }
    })
})




function DeleteMeal(id){
    $.ajax({
        type:'POST',
        url:"/delete",
        data:{id},
        success:(res)=>{
            BuildMeal(res.meals)
            
            $('.succes').slideDown()
            setTimeout(() => {
                $('.succes').slideUp()
            }, 2000);
        }
    })
}
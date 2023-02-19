

function AttachEventSlider(){
    $('.h3').on('click', (e)=>{

        $(e.target).parent().find('.detail').slideToggle(200)
    })
}




const SearchMeal = ()=>{
    var text = $('#text').val().trim()

    if(text.split("\n").length < 3){
        $('.empty').show()
        setTimeout(() => {
            $('.empty').hide()
        }, 3000);
    }
    else{
        $('button').text('searching..')
        $.ajax({
            type:"POST",
            url:"/search-meal",
            data: {text},
            success:(res)=>{
                    BuildMeal(res.meals)
                    $('button').text('Submit')
            }
        })
    }
    
}


const BuildMeal = (meals)=>{

    $('#number').text('Result : ' + meals.length)
    if(meals.length != 0){

    var t = ''
    meals.forEach(element => {
        var ul = ''
        element.ing.forEach((i)=>{
            ul += `
                <li>${i}</li>
            `
        })
        t += `

        <div class="meal">
            <div class="h3"><i class="fa-solid fa-utensils"></i>${element.title}</div>
            <div class="detail">
                <p><strong>Ingredients :</strong></p>
                <div class="ing">
                    <ul>
                        ${ul}
                    </ul>
                </div>
            </div>
        </div>

        `
    });

    $('#res').html(t)
    AttachEventSlider()
    }
    else{
        $('#res').html("<p>No meal.</p>")
    }

}
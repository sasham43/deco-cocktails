import {generate} from 'shortid'

function translateForImport(imported){
    const new_cocktail = {
        ingredients: []
    }
    // var index = -1 // so we can increment to 0
    for (var prop in imported) {
        console.log('prop', prop)

        if (prop == 'n') {
            new_cocktail['name'] = imported[prop]
        } else if (prop == 'd') {
            new_cocktail['directions'] = imported[prop]
        } else {
            var num = parseInt(prop)
            var type = prop.replace(`${num}`, '')

            if (!new_cocktail.ingredients[num]) {
                new_cocktail.ingredients[num] = {}
            }

            if (type == 'n') {
                new_cocktail.ingredients[num].ingredient_name = imported[prop]
            } else if (type == 'p') {
                new_cocktail.ingredients[num].parts = imported[prop]
            }
        }
    }
    new_cocktail.ingredients = new_cocktail.ingredients.map(i => {
        return { ...i, id: generate() }
    })
    new_cocktail.id = generate()
    // setCocktail(new_cocktail)
    console.log('new cocktail', new_cocktail)
    return new_cocktail
}

export {
    translateForImport
}
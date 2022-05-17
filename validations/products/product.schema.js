import joi from '@hapi/joi';
import { not } from '@hapi/joi/lib/base';


const productvalidationschema={
    product:joi.object({
        name:joi.string()
            .label("Product Name")
            .min(5)
            .max(50)
            .required()
            .regex(/[${};<>`]/, { invert: true })
            .trim()
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        description:joi.string()
            .label("Product Description")
            .min(10)
            .max(600)
            .required()
            .trim()
            .regex(/[${};<>`]/, { invert: true })
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        imageurl:joi.array()
            .items(joi.string())
            .label("Product Image URL")
            .required(),
        registrationdate:joi.date()
            .label("Product Registration Date")
            .iso()
            .default(new Date()),
        likes:joi.number()
            .label("Product Likes")
            .integer() // no floating values
            .positive()
            .default(0)
            .min(0),
        dislikes:joi.number()
            .label("Product Dislikes")
            .integer()
            .positive()
            .default(0)
            .min(0),
        targetgender:joi.string()
            .label("Product Targeted Gender")
            .valid('men','women','kids','unisex')
            .lowercase()
            .trim()
            .required()
            .regex(/[${};<>`]/, { invert: true })
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        metal:joi.string()
            .label("Product Metal Type")
            .valid('gold','silver','platinum','imitation')
            .lowercase()
            .trim()
            .required()
            .regex(/[${};<>`]/, { invert: true })
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        metalweight:joi.number()
            .label("Metal Weight")
            .positive()
            .greater(0)
            .required(),
        grossweight:joi.number()
            .label("Product Gross Weight")
            .positive()
            .min(joi.ref('metalweight'))
            .required(),
        metalpurity:joi.string()
            .label("Product Metal Purity")
            .trim()
            .uppercase()
            //if metal is gold than only KT unit is used otherwise use 100%
            .when('metal',{is:"gold", then:joi.valid('18KT','22KT','24KT').required(), otherwise:joi.valid('100%').default("100%")})
            .regex(/[${};<>`]/, { invert: true })
            .messages({
                "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }),
        makingcharge:joi.number()
            .label("Product Making Charges")
            .greater(0)
            .positive()
            .required(),
        keywords:joi.array()
            .items(
                joi.string()
                .trim()
                .lowercase()
                .regex(/[${};<>`]/, { invert: true })
                .messages({"string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,`+" '`' )"
            }))
            .label("Product Keywords")
            .default([joi.ref('metal'),joi.ref('targetgender')+' '+joi.ref('name'),joi.ref('name'),joi.ref('category'),joi.ref('targetgender')+' '+joi.ref('category'),joi.ref('class')])
    })
}
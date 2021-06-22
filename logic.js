class Символ
{
	constructor(имя)
	{
		this.имя = имя
	}

	символы()
	{
		let res = new Set([this.имя])
		return res
	}

	вычислить(модель)
	{
		if(модель[this.имя] === undefined)
			throw new TypeError(`${this.имя} не задана в  модели`)
		return модель[this.имя]
	}
}


class И
{
	constructor(...операнды)
	{
		this.операнды = операнды
	}

	символы()
	{
		let элементы =  new Set()
		for(let элемент of this.операнды)
		{
			элементы = объединить(элементы, элемент.символы())
		}
		return элементы
	}

	вычислить(модель)
	{ 
		for(let i = 0; i < this.операнды.length; i++)
		{ 
			let res = this.операнды[i].вычислить(модель)
			if(!res) return false
		}
		return true
	}
	
	добавить(операнд)
	{
		this.операнды.push(операнд)
	}
}


class Или
{
	constructor(...операнды)
	{
		this.операнды = операнды
	}

	символы()
	{
		let элементы =  new Set()
		for(let элемент of this.операнды)
		{
			элементы = объединить(элементы, элемент.символы())
		}
		return элементы
	}

	вычислить(модель)
	{ 
		for(let i = 0; i < this.операнды.length; i++) 
		{
			let res = this.операнды[i].вычислить(модель)
			if(res) return true
		}
		return false
	}
}


class Не
{
	constructor(операнд)
	{
		this.операнд = операнд
	}

	символы()
	{
		return this.операнд.символы()
	}

	вычислить(модель)
	{
		return !this.операнд.вычислить(модель)
	}
}


class Импликация
{
	constructor(антецедент, следствие)
	{
		this.антецедент = антецедент
		this.следствие = следствие
	}

	символы()
	{
		let res = объединить( this.антецедент.символы(), this.следствие.символы())
		return res 
	}

	вычислить(модель)
	{
		if(this.антецедент.вычислить(модель))
		{
			return this.следствие.вычислить(модель)
		}
		else
			return true
	}
}

class Эквивалентность
{
	constructor(левый, правый)
	{
		this.левый  = левый
		this.правый = правый
	}

	символы()
	{
		let res = объединить( this.левый.символы(), this.правый.символы())
		return res 
	}

	вычислить(модель)
	{
		if(this.левый.вычислить(модель) === this.правый.вычислить(модель))
			return true
		else
			return false
	}
}

function следующий(set1)
{
	let h = true
	let n = Object.keys(set1).length
	for(let элемент in set1)
	{
		if(h)
		{
			if(set1[элемент])
			{
				set1[элемент] = false
			}
			else
			{
				set1[элемент] = true
				h = false
				break
			}
		}
		else
		{
			break
		}
	}
}




function проверка_моделей(знание, запрос)
//Проверяет, что высказывание логически следует из базы знаний
{
	let импликация = new Импликация(знание, запрос)
	let _символы = объединить(знание.символы(), запрос.символы())
	let модель = {}
	for(let элемент of _символы)
	{
		модель[элемент] = false
	}
	const n = Math.pow(2, _символы.size)
	for(let i = 0; i < n; i++)
	{
		let res = импликация.вычислить(модель)
		if(!res)
			return false
		следующий(модель)
	}
	return true
}


module.exports = {проверка_моделей, следующий, Символ, И, Не, Или, Импликация, Эквивалентность}



function объединить(множествоА, множествоБ)
{
	let _объединить = new Set(множествоА)
	for(let элемент of множествоБ)
	{
		_объединить.add(элемент)
	}
	return _объединить
}



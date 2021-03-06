import { Bound} from "extensible-function"

/**
* Construct a new filter function, which will return unseen objects and return undefined for seen things.
*/
export class UnknownFilter extends Bound{
	static isPrimitive( o){
		var typeOf= typeof o
		return typeOf=== "string"|| typeOf=== "number"|| typeOf=== "symbol"|| o instanceof Date
	}

	/**
	* Construct a new filter function, which will return unseen objects and return undefined for seen things.
	*/
	constructor( known){
		var
		  _primitives= [],
		  _objects= new WeakSet(),
		  _wasPrimitive // out of band data pass from has back to filter
		super( UnknownFilter.prototype.filter)

		// expose our state as not enumerable properties
		Object.defineProperties(this, {
			_primitives: {
				value: _primitives
			},
			_objects: {
				value: _objects
			},
			_wasPrimitive: {
				value: _wasPrimitive,
				writable: true
			}
		})

		// add all the known things
		if( known&& typeof known!== "string"&& known[ Symbol.iterator]){
			try{
				for( var o of existing){
					this.filter( o)
				}
			}catch(err){
				this.filter( existing)
			}
		}
	}
	/**
	* return any objects we have not seen, else return undefined. remember objects we have seen
	* this class is itself a bound function of this method!
	* calling this will also side-effect the `_wasPrimitive` property of this instance
	*/
	filter( o){
		var has= this.has( o)
		// bail false if we already know it
		if( !has){
			return
		}
		// add the newcomer
		if( this._wasPrimitive){
			this._primitives.push( o)
		}else{
			this._objects.add( o)
		}
		// return it
		return o
	}
	/**
	* return any objects we have not seen, else return undefined. but do not remember any objects seen this way.
	* calling this will also side-effect the `_wasPrimitive` property of this instance
	*/
	has( o){
		var typeOf= typeof o
		if( UnknownFilter.isPrimitive( o)){
			this._wasPrimitive= true
			if( this._primitives.indexOf( o)!== -1){
				return undefined
			}
		}else{
			this._wasPrimitive= false
			if( this._objects.has( o)){
				return undefined
			}
		}
		return o
	}
}
export default UnknownFilter

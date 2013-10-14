

//state {type, value}

function NCState(owner, states)
{
	this.owner = owner;

	this.states = states;
	if(states != null)
		this.activeState = states[0];
	//add our trigger to animation end trigger of html object
    if(this.owner.afterTransition != null)
    {
        this.owner.element.addEventListener('webkitTransitionEnd', function(){
            console.log("Transition ended");
            this.naviData.afterTransition();
        });
    }
	
	this.switchToState = function(stateID)
	{
		if(this.states != null && this.states.length >= stateID)
		{
			var el = $("#" + this.owner.element.id);
			if(this.activeState != null && el.hasClass(this.activeState))
                    el.removeClass(this.activeState);
			this.activeState = this.states[stateID];
			el.addClass(this.activeState);
		}
		
	};
	
	
}





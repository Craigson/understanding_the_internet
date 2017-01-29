# This document serves as a place for documentation for highlighting interesting/useful things I've learned during this project.

<p>
You can get the position of an element (ie. the distance from the top of the page in pixels) using the DOM selector '.offset().top'.
Eg.
<pre> document.getElementById('#sometag').offset().top;</pre>
or
<pre> $('#sometag').offset().top; </pre>
</p>

<p>
You can force the browser to scroll to a specific position using jquery animation.
eg. 
<pre>
$('#someTag').click(function(){
    $('html, body').animate({
        scrollTop: $('#someOtherTag').offset().top;
    }, 1000);
});
</pre>
</p>

<p>
You can extract the underlying HTML from an element when you click on it using
'event.target'.
Eg.
<pre>
$('#someTag').click(function(e){
    console.log(e.target.text());
})
</pre>
</p>
- 



'use strict';

var $ = require('jquery');  
var React = require('react');

/*
var DjangoCSRFToken = React.createClass({
    getCookie: function(name) {
        var cookieValue = 'hello';
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, namelength + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(
                        cookie.substring(name.length + 1)
                        );
                    break;
                }
            }
        }
        return cookieValue;
    },
    render: function() {
        var csrftoken = this.getCookie('csrftoken');
        return React.DOM.input(
            {type:"hidden", name:"csrfmiddlewaretoken", value:csrfToken}
        );
    }
});

//module.exports = DjangoCSRFToken: DjangoCSRFToken;
*/
/*
var pairs = document.cookie.split(";");
var cookies = pairs.reduce(function(a, pair) {
  var pieces = pair.split("=");
  a[pieces[0].trim()] = pieces[1].trim();
  return a;
}, {});
var csrftoken = cookies.csrftoken;
*/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            console.log(csrftoken)
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var LinkBox = React.createClass({
  handleLinkSubmit: function(link) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="linkBox">
        <h1>Enter a link below</h1>
        <h2>{this.state.data}</h2>
        <LinkForm onLinkSubmit={this.handleLinkSubmit} />
      </div>
    );
  }
});

var LinkForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var link = React.findDOMNode(this.refs.link).value.trim();
    if (!link) {
      return;
    }
    this.props.onLinkSubmit({link: link});
    React.findDOMNode(this.refs.link).value = '';
  },
  render: function() {
    return (
      <form method="post" className="linkForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="www.enterlinkhere.com" ref="link" />
        <input type="submit" value="Shorten" />
      </form>
    );
  }
});

React.render(
  <LinkBox url="postdetails/" />,
  document.getElementById('content')
);


'use strict';

var $ = require('jquery');  
var React = require('react');

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
    /*
    console.log('hi');
    var links = this.state.data;
var newLinks = links.concat([link]);
    this.setState({data: newLinks});
    console.log('this.state.data')
    console.log(this.state.data)
    console.log('link')
    console.log(link)
    */
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(msg, status, data) {
        console.log(data.responseJSON)
        this.setState({data: data.responseJSON});
      }.bind(this),
      error: function(xhr, status, err, data) {
        console.log('error')
        console.log(data)
        console.log(link)
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="linkBox">
        <h1>LilUrl Link Shortener</h1>
        <LinkForm onLinkSubmit={this.handleLinkSubmit} />
        <LinkList data={this.state.data} />
      </div>
    );
  }
});

var Link = React.createClass({
    render: function() {
        return (
            <div className="link">
                <h2 className="linkUrl">
                    {this.props.code}
                </h2>
                <p>
                    {this.props.link}
                </p>
            </div>
        );
    }
});

var LinkList = React.createClass({
    render: function() {
        var linkNodes = this.props.data.map(function (data) {
            return (
                <Link link={data.link} code={data.code}>
                </Link>
            );
        });
        return (
            <div className="linkList">
                {linkNodes}
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


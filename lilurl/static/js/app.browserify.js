'use strict';

var $ = require('jquery');  
var React = require('react');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
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
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var LinkBox = React.createClass({
  handleLinkSubmit: function(link, errorMsg) {
    if (errorMsg) {
        this.setState({errorMsg: true})
        return;
    }
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(data) {
        console.log(data);
        this.setState({data: data, errorMsg: false});
      }.bind(this),
      error: function(xhr, status, err, data) {
        console.log(status, err)
      }.bind(this)
    });
  },
  getInitialState: function() {
    return ({data:[], errorMsg: false});
  },
  render: function() {
    return (
      <div>
      <div className="linkBox">
        <h1>LilUrl Link Shortener</h1>
        <div></div>
        <LinkForm onLinkSubmit={this.handleLinkSubmit} />
        <ErrorBox errorMsg={this.state.errorMsg} />
        <LinkList data={this.state.data} />
      </div>
      </div>
    );
  }
});

var ErrorBox = React.createClass({
    render: function() {
        if (this.props.errorMsg) {
            return (
                <div className="errorMsg">Invalid URL</div>
            );
        } else {
            return (
                <div className="errorMsg"></div>
            );
        }
    }
});

var Link = React.createClass({
    render: function() {
        return (
            <div className="link">
                <p>Here&apos;s your lilurl:</p>
                <div className="container">
                    <a href={this.props.code} className="linkUrl">
                        {this.props.code}
                    </a>
                    <p>
                        {this.props.link}
                    </p>
                </div>
            </div>
        );
    }
});

var LinkList = React.createClass({
    render: function() {
        var linkNodes = this.props.data.map(function (data) {
            console.log(data)
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

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

var LinkForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var link = React.findDOMNode(this.refs.link).value.trim();
    if (!link) {
       return;
    } else if (link.match(regex)) {
        this.props.onLinkSubmit({link: link}, false);
        React.findDOMNode(this.refs.link).value = '';
    } else {
        this.props.onLinkSubmit({link: link}, true);
    }
  },
  render: function() {
    return (
      <form method="post" className="linkForm" id="shortenLinkForm" onSubmit={this.handleSubmit}>
        <input className="url-input" type="text" placeholder="Enter a link to shorten it" ref="link" />
        <button className="btn" type="submit">Shorten</button>
      </form>
    );
  }
});

React.render(
  <LinkBox url="postdetails/" />,
  document.getElementById('content')
);


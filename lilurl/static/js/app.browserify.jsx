'use strict';

var $ = require('jquery');  
var React = require('react');
var Cookies = require('js-cookie');

var csrftoken = Cookies.get('csrftoken');

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
  setCookies: function(data) {
    var links = Cookies.getJSON('links');
    if (links) {
       var newLinks = data.concat(links.slice(0,10));
       Cookies.set('links', newLinks);
    } else {
       Cookies.set('links', data);
    } 
  },
  handleLinkSubmit: function(link, errorMsg) {
    if (errorMsg) {
        this.setState({errorMsg: true});
        return;
    }
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: link,
      success: function(data) {
        this.setState({data: data, errorMsg: false});
        this.setCookies(data);
      }.bind(this),
      error: function(xhr, status, err, data) {
        console.log(status);
        console.log(data);
        console.log(err);
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
                <div className="errorMsg">Please enter a valid URL</div>
            );
        } else {
            return (
                <div className="errorMsg"></div>
            );
        }
    }
});

var Link = React.createClass({
    shortLink: function(link) {
        if ( link.length > 60 ) {
            return (link.substr(0,60)+'...');
        } else {
            return link;
        }
    },
    fullLilurl: function(code) {
        return (window.location.origin + '/' + code);
    },
    render: function() {
        return (
            <div className="link">
                <div className="container">
                    <a href={this.fullLilurl(this.props.code)} className="linkUrl">
                        {this.fullLilurl(this.props.code)}
                    </a>
                    <p id='redirect-url'>
                        {this.shortLink(this.props.link)}
                    </p>
                </div>
            </div>
        );
    }
});

var LinkList = React.createClass({
    render: function() {
        var cookieLinks = Cookies.getJSON('links');
        if (cookieLinks) {
            var recentHeader = <h2 className='listHeader'>Recently Shortened Links</h2>
            var recentNodes = cookieLinks.map(function (cookieLinks) {
                return (
                   <Link link={cookieLinks.link} code={cookieLinks.code} key={cookieLinks.code}>
                   </Link>
                );
            });
        } else {
            var recentHeader = <div></div>
            var recentNodes = <div></div>
        }
        var linkNodes = this.props.data.map(function (data) {
            return (
                <div key={data.code}>
                    <h2 className='listHeader'>Here's Your LilURL!</h2>
                    <Link link={data.link} code={data.code}>
                    </Link>
                </div>
            );
        });
        return (
            <div className="linkList">
                {linkNodes}
                {recentHeader}
                {recentNodes}
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
    if (!link || link == '') {
       return;
    } else if (link.match(regex) && link.length < 200) {
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


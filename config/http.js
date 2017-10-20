'use strict';

module.exports.http = {
  port: 6789,
  viewEngine: 'pug',
  statusCode: {
      400:	{
        title: 'Bad Request',
        message: 'The server cannot process the request due to something that is perceived to be a client error.',
      },
      401:	{
        title: 'Unauthorized',
        message: 'The requested resource requires an authentication.',
      },
      402:	{
        title: 'Payment Required',
      },
      403:	{
        title: 'Access Denied',
        message: 'The requested resource requires an authentication.',
      },
      404:	{
        title: 'Resource not found',
        message: 'The requested resource could not be found but may be available again in the future.',
      },
      405:	{
        title: 'Method Not Allowed',
      },
      406:	{
        title: 'Not Acceptable',
      },
      407:	{
        title: 'Proxy Authentication Required',
      },
      408:	{
        title: 'Request Timeout',
      },
      409:	{
        title: 'Conflict',
      },
      410:	{
        title: 'Gone',
      },
      411:	{
        title: 'Length Required',
      },
      412:	{
        title: 'Precondition Failed',
      },
      413:	{
        title: 'Payload TooLarge',
      },
      414:	{
        title: 'URI Too Long',
      },
      415:	{
        title: 'Unsupported Media Type',
      },
      416:	{
        title: 'Range Not Satisfiable',
      },
      417:	{
        title: 'Expectation Failed',
      },
      418:	{
        title: 'Im A Teapot',
      },
      421:	{
        title: 'Misdirected Request',
      },
      422:	{
        title: 'Unprocessable Entity',
      },
      423:	{
        title: 'Locked',
      },
      424:	{
        title: 'Failed Dependency',
      },
      425:	{
        title: 'Unordered Collection',
      },
      426:	{
        title: 'Upgrade Required',
      },
      428:	{
        title: 'Precondition Required',
      },
      429:	{
        title: 'Too Many Requests',
      },
      431:	{
        title: 'Request Header Fields Too Large',
      },
      451:	{
        title: 'Unavailable For Legal Reasons',
      },
      500:	{
        title: 'Internal Server Error',
        message: 'An unexpected condition was encountered.<br />Our service team has been dispatched to bring it back online.'
      },
      501:	{
        title: 'Not Implemented',
        message: 'The Webserver cannot recognize the request method.',
      },
      502:	{
        title: 'Webservice currently unavailable',
        message: "We've got some trouble with our backend upstream cluster.<br />Our service team has been dispatched to bring it back online.",
      },
      503:	{
        title: 'Webservice currently unavailable',
        message: "We've got some trouble with our backend upstream cluster.<br />Our service team has been dispatched to bring it back online.",
      },
      504:	{
        title: 'Gateway Timeout',
      },
      505:	{
        title: 'HTTP Version Not Supported',
      },
      506:	{
        title: 'Variant Also Negotiates',
      },
      507:	{
        title: 'Insufficient Storage',
      },
      508:	{
        title: 'Loop Detected',
      },
      509:	{
        title: 'Bandwidth Limit Exceeded',
      },
      510:	{
        title: 'Not Extended',
      },
      511:	{
        title: 'Network Authentication Required',
      },
    },
};

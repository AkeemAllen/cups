(this.webpackJsonpcups = this.webpackJsonpcups || []).push([
  [0],
  {
    110: function(e, t, a) {
      e.exports = a.p + 'static/media/coffee.7c754a30.png';
    },
    186: function(e, t, a) {
      e.exports = a(317);
    },
    191: function(e, t, a) {},
    192: function(e, t, a) {},
    212: function(e, t) {},
    214: function(e, t) {},
    251: function(e, t) {},
    252: function(e, t) {},
    313: function(e, t, a) {
      e.exports = a.p + 'static/media/coffee-background_3.509b3635.jpg';
    },
    314: function(e, t, a) {
      e.exports = a.p + 'static/media/coffeeLogo1.b538f3cd.png';
    },
    315: function(e, t, a) {
      e.exports = a.p + 'static/media/sugarbun.2b970e1e.jpg';
    },
    316: function(e, t, a) {
      e.exports = a.p + 'static/media/coffee-logo2.368d4cdd.png';
    },
    317: function(e, t, a) {
      'use strict';
      a.r(t);
      var n,
        r = a(0),
        o = a.n(r),
        c = a(12),
        i = a.n(c),
        l = (a(191), a(22)),
        s = a(23),
        u = a(25),
        d = a(24),
        m = a(26),
        p = (a(192), a(50)),
        f = a(44),
        E = a(346),
        h = a(351),
        g = a(353),
        b = a(350),
        y = a(352),
        C = a(31),
        v = a(40),
        O = a.n(v);
      n = ''.concat(
        Object({
          NODE_ENV: 'production',
          PUBLIC_URL: '',
          REACT_APP_JWT_SECRET: 'secretKey'
        }).REACT_APP_MONGO_API_BASE_URI,
        '/products'
      );
      var x,
        j = function() {
          return function(e) {
            fetch(n)
              .then(function(e) {
                return e.json();
              })
              .then(function(t) {
                return e({ type: 'FETCH_PRODUCTS', payload: t });
              });
          };
        },
        _ = function(e) {
          return function(t) {
            O.a.delete(n + '/'.concat(e)).then(function() {
              return t({ type: 'DELETE_PRODUCT', payload: e });
            });
          };
        },
        w = function(e, t, a, r) {
          return function(o) {
            O.a
              .post(n, { productName: e, category: r, quantity: a, price: t })
              .then(function(e) {
                o({ type: 'NEW_PRODUCT', payload: e.data });
              })
              .catch(function(e) {
                throw e;
              });
          };
        },
        S = function(e, t) {
          var a = t.name,
            r = t.price,
            o = t.quantity,
            c = t.category,
            i = t.image;
          return function(t) {
            O.a
              .put(n + '/update/'.concat(e), {
                productName: a,
                category: c,
                quantity: o,
                price: r,
                image: i
              })
              .then(function(e) {
                return t({ type: 'UPDATE_PRODUCT', payload: e.data });
              });
          };
        },
        R = function(e, t) {
          return function(a) {
            var n;
            (n = ''.concat(
              Object({
                NODE_ENV: 'production',
                PUBLIC_URL: '',
                REACT_APP_JWT_SECRET: 'secretKey'
              }).REACT_APP_MONGO_API_BASE_URI,
              '/upload'
            )),
              O.a
                .post(n, t)
                .then(function(t) {
                  a(S(e, { image: t.data.file.filename }));
                })
                .catch(function(e) {
                  throw e;
                });
          };
        };
      x = ''.concat(
        Object({
          NODE_ENV: 'production',
          PUBLIC_URL: '',
          REACT_APP_JWT_SECRET: 'secretKey'
        }).REACT_APP_MONGO_API_BASE_URI,
        '/orders'
      );
      var k,
        A = function(e, t) {
          return function(a) {
            a({ type: 'ADD_TO_CART', productId: e, quantity: t });
          };
        },
        I = function(e, t, a, n) {
          return function(r) {
            r({
              type: 'CALCULATE_COST',
              cost: a * t,
              productId: e,
              accountBalance: n
            });
          };
        },
        N = function(e) {
          return function(t) {
            t({ type: 'REMOVE_FROM_CART', payload: e });
          };
        },
        T = function(e, t, a, n) {
          return function(r) {
            e.customerInfo.accountBalance < a
              ? r({
                  type: 'PLACE_ORDER_FAILURE',
                  payload: 'account balance too low'
                })
              : O.a
                  .post(x, { userId: e._id, products: t, cost: a })
                  .then(function(e) {
                    t.forEach(function(e) {
                      var t = e.product.quantity - e.quantity;
                      r(S(e.product._id, { quantity: t }));
                    }),
                      r({ type: 'PLACE_ORDER', payload: e.data });
                  })
                  .then(function() {
                    var t;
                    (t = n - a),
                      console.log(t),
                      r(V(e._id, { customerInfo: { accountBalance: t } }));
                  })
                  .catch(function(e) {
                    throw e;
                  });
          };
        },
        U = function() {
          return function(e) {
            e({ type: 'REMOVE_ALL_FROM_CART' });
          };
        },
        P = a(171),
        B = a.n(P);
      k = ''.concat(
        Object({
          NODE_ENV: 'production',
          PUBLIC_URL: '',
          REACT_APP_JWT_SECRET: 'secretKey'
        }).REACT_APP_MONGO_API_BASE_URI,
        '/users/'
      );
      var D = function(e, t) {
          return function(a) {
            var n;
            (n = ''.concat(
              Object({
                NODE_ENV: 'production',
                PUBLIC_URL: '',
                REACT_APP_JWT_SECRET: 'secretKey'
              }).REACT_APP_MONGO_API_BASE_URI,
              '/users/login'
            )),
              O.a
                .post(n, { userName: e, password: t })
                .then(function(e) {
                  localStorage.setItem('token', e.data.token),
                    B.a.verify(e.data.token, ''.concat('secretKey'), function(
                      e,
                      t
                    ) {
                      if (e) throw e;
                      var n;
                      localStorage.setItem('isAdmin', t.user.isAdmin),
                        localStorage.setItem('user', JSON.stringify(t.user)),
                        a({ type: 'AUTH_USER', payload: t }),
                        a(
                          ((n = t.user.customerInfo.accountBalance),
                          function(e) {
                            e({ type: 'FETCH_ACCOUNT_BALANCE', payload: n });
                          })
                        );
                    });
                })
                .catch(function(e) {
                  throw (localStorage.removeItem('token'),
                  localStorage.removeItem('isAdmin'),
                  a({ type: 'AUTH_USER_FAILURE', payload: e }),
                  e);
                });
          };
        },
        L = function() {
          return function(e) {
            localStorage.removeItem('user'),
              localStorage.removeItem('token'),
              localStorage.removeItem('isAdmin'),
              e({ type: 'LOG_OUT' });
          };
        },
        F = function(e, t, a) {
          return function(n) {
            O.a
              .post(k, {
                userName: e,
                password: t,
                customerInfo: { disability: a }
              })
              .then(function(e) {
                n({ type: 'REGISTER_USER', payload: e.data });
              })
              .catch(function(e) {
                n({ type: 'REGISTER_USER_FAILURE', payload: e });
              });
          };
        },
        V = function(e, t) {
          var a = t.userName,
            n = t.customerInfo,
            r = t.managerInfo;
          return function(t) {
            O.a
              .put(k + 'update/'.concat(e), {
                userName: a,
                customerInfo: n,
                managerInfo: r
              })
              .then(function(e) {
                return t({ type: 'UPDATE_USER_INFO', payload: e.data });
              });
          };
        },
        M = function() {
          return function(e) {
            e({ type: 'SET_NEW_USER_NULL' });
          };
        },
        W = a(10),
        G = a(8),
        J = function(e) {
          var t = e.formErrors;
          return o.a.createElement(
            'div',
            { style: q.formErrors },
            Object.keys(t).map(function(e, a) {
              return t[e].length > 0
                ? o.a.createElement('p', { key: a }, t[e])
                : '';
            })
          );
        },
        q = { formErrors: { color: 'red' } },
        z = (function(e) {
          function t(e) {
            var a;
            return (
              Object(l.a)(this, t),
              ((a = Object(u.a)(
                this,
                Object(d.a)(t).call(this, e)
              )).handleChange = function(e) {
                e.preventDefault();
                var t = e.target,
                  n = t.name,
                  r = t.value;
                a.setState(Object(f.a)({}, n, r), function() {
                  a.validateField(n, r);
                });
              }),
              (a.validateField = function(e, t) {
                var n = a.state.formErrors,
                  r = a.state.passwordValid,
                  o = a.state.usernameValid,
                  c = '';
                switch (e) {
                  case 'userName':
                    (o = t.length >= 3),
                      (n.username = o ? '' : 'Name is too short');
                    break;
                  case 'password':
                    (r = t.length >= 3),
                      (n.passwordValid = r ? '' : 'Password is too short');
                    break;
                  default:
                    (c = 'Just needed a default case lol'), console.log(c);
                }
                a.setState(
                  { formErrors: n, passwordValid: r, usernameValid: o },
                  a.validateForm
                );
              }),
              (a.validateForm = function() {
                a.setState({
                  formValid: a.state.usernameValid && a.state.passwordValid
                });
              }),
              (a.handleSubmit = function(e) {
                e.preventDefault();
                var t = a.state,
                  n = t.userName,
                  r = t.password;
                a.props.authorizeUser(n, r);
              }),
              (a.state = {
                userName: '',
                password: '',
                redirect: !1,
                formErrors: { password: '', userName: '' },
                usernameValid: !1,
                passwordValid: !1,
                formValid: !1
              }),
              a
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'render',
                value: function() {
                  var e = this.state,
                    t = e.userName,
                    a = e.password,
                    n = e.formErrors,
                    r = e.formValid,
                    c = this.props,
                    i = c.auth,
                    l = c.user,
                    s = c.loginError;
                  return void 0 !== l
                    ? i
                      ? o.a.createElement(p.a, { to: '/admin' })
                      : o.a.createElement(p.a, { to: '/menu' })
                    : o.a.createElement(
                        E.a,
                        {
                          style: {
                            justifyContent: 'center',
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center'
                          },
                          maxWidth: 'sm'
                        },
                        o.a.createElement(
                          'form',
                          { onSubmit: this.handleSubmit, style: K.form },
                          o.a.createElement('h1', { style: K.header }, 'Login'),
                          null !== s
                            ? o.a.createElement(
                                'div',
                                { style: { color: 'red', margin: 'auto' } },
                                'User Not Found'
                              )
                            : null,
                          o.a.createElement(J, { formErrors: n }),
                          o.a.createElement(
                            'div',
                            { style: K.input },
                            o.a.createElement(b.a, {
                              fontSize: 'small',
                              style: K.icon
                            }),
                            o.a.createElement(h.a, {
                              placeholder: 'Username',
                              value: t,
                              name: 'userName',
                              onChange: this.handleChange,
                              disableUnderline: !0
                            })
                          ),
                          o.a.createElement(
                            'div',
                            { style: K.input },
                            o.a.createElement(y.a, {
                              fontSize: 'small',
                              style: K.icon
                            }),
                            o.a.createElement(h.a, {
                              placeholder: 'Password',
                              value: a,
                              name: 'password',
                              type: 'password',
                              onChange: this.handleChange,
                              disableUnderline: !0
                            })
                          ),
                          o.a.createElement(
                            g.a,
                            {
                              type: 'submit',
                              style: K.submitBtn,
                              disabled: !r
                            },
                            'Submit'
                          ),
                          o.a.createElement(
                            C.b,
                            { to: '/register', style: { marginTop: '20px' } },
                            'Not Registered? Register Here.'
                          )
                        )
                      );
                }
              }
            ]),
            t
          );
        })(o.a.Component),
        H = Object(W.b)(
          function(e) {
            return {
              auth: e.auth.isAdmin,
              user: e.auth.user,
              loginError: e.auth.loginError
            };
          },
          function(e) {
            return { authorizeUser: Object(G.b)(D, e) };
          }
        )(z),
        K = {
          form: {
            display: 'flex',
            flexDirection: 'column',
            padding: '100px',
            backgroundColor: 'white'
          },
          header: {
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Courgette, sans-serif'
          },
          input: {
            display: 'flex',
            marginBottom: '20px',
            alignItems: 'center',
            borderRadius: '20px',
            backgroundColor: '#ccc5b9',
            paddingRight: '15px',
            paddingLeft: '15px'
          },
          submitBtn: {
            marginTop: '20px',
            background: '#e35b2d',
            color: 'white',
            borderRadius: '25px'
          },
          icon: { marginRight: '15px' },
          modalMessage: {
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
          },
          modal: {
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            height: '100vh'
          }
        },
        $ = a(354),
        X = a(355),
        Q = a(356),
        Y = a(357),
        Z = a(90),
        ee = {
          base: { fontFamily: 'Courgette, sans-serif' },
          container: {
            backgroundImage:
              'url(`require("../assets/images/coffee-background_3.jpg")`)',
            height: '400px'
          },
          headerText: { color: 'black' },
          content: {
            width: '60%',
            margin: 'auto',
            paddingTop: '100px',
            paddingBottom: '100px'
          },
          contentItem: {
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
            alignItems: 'center'
          },
          callToAction: { height: '400px' },
          card: {
            maxWidth: 340,
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
            marginBottom: '30px'
          },
          media: { height: 0, paddingTop: '56.25%' }
        },
        te = [
          {
            attribute: 'Diversity',
            image: a(110),
            description: 'Many Flavors, Many People, One Cup',
            alt: 'diversity'
          },
          {
            attribute: 'Compassion',
            image: a(110),
            description: 'Just Like Mom Used To Make.',
            alt: 'compassion'
          },
          {
            attribute: 'Love',
            image: a(110),
            description: "Is It In The Atmosphere? No, It's Just Our Coffee.",
            alt: 'love'
          }
        ].map(function(e) {
          return o.a.createElement(
            $.a,
            { item: !0, style: ee.contentItem, key: e.attribute },
            o.a.createElement('h1', null, e.attribute),
            o.a.createElement('p', null, e.description)
          );
        });
      var ae = function() {
          return o.a.createElement(
            'div',
            { style: ee.base },
            o.a.createElement(
              $.a,
              {
                container: !0,
                style: {
                  backgroundImage: 'linear-gradient(rgba(250, 250, 250,0.5), rgba(250, 250, 250,0.5)),url('.concat(
                    a(313),
                    ')'
                  ),
                  backgroundSize: 'cover',
                  height: '400px',
                  marginTop: '50px'
                },
                justify: 'center'
              },
              o.a.createElement(
                $.a,
                { item: !0, style: ee.headerText },
                o.a.createElement('img', {
                  src: a(314),
                  alt: 'cups logo',
                  width: '300px'
                })
              )
            ),
            o.a.createElement(
              $.a,
              {
                container: !0,
                direction: 'row',
                alignItems: 'center',
                justify: 'center',
                style: ee.content,
                spacing: 9
              },
              te
            ),
            o.a.createElement(
              $.a,
              {
                container: !0,
                direction: 'column',
                alignItems: 'center',
                style: ee.callToAction
              },
              o.a.createElement(
                $.a,
                { item: !0 },
                o.a.createElement('h1', null, "Today's Special")
              ),
              o.a.createElement(
                $.a,
                { item: !0 },
                o.a.createElement(
                  X.a,
                  { style: ee.card },
                  o.a.createElement(Q.a, {
                    style: ee.media,
                    image: a(315),
                    title: 'Coffee'
                  }),
                  o.a.createElement(
                    Y.a,
                    null,
                    o.a.createElement(
                      Z.a,
                      {
                        variant: 'body2',
                        color: 'textSecondary',
                        component: 'p'
                      },
                      'Marmalade dipped in Svelete Sauce'
                    )
                  )
                )
              ),
              o.a.createElement(
                $.a,
                { item: !0 },
                o.a.createElement(
                  C.b,
                  { to: '/menu', style: { textDecoration: 'none' } },
                  o.a.createElement(
                    g.a,
                    {
                      style: {
                        backgroundColor: '#e35b2d',
                        color: 'white',
                        fontFamily: 'Courgette'
                      }
                    },
                    'See What else is on the Menu'
                  )
                )
              )
            )
          );
        },
        ne = a(15),
        re = a(175),
        oe = a(371),
        ce = a(372),
        ie = a(373),
        le = a(387),
        se = a(359),
        ue = a(386),
        de = a(374),
        me = a(376),
        pe = a(363),
        fe = a(4),
        Ee = a(361),
        he = a(362),
        ge = a(364),
        be = a(367),
        ye = a(181),
        Ce = a(368),
        ve = a(369),
        Oe = a(370),
        xe = a(365),
        je = a(366),
        _e = a(385),
        we = a(358),
        Se = a(318),
        Re = Object(re.a)(function(e) {
          return {
            modal: {
              justifyContent: 'center',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              height: '100vh'
            },
            form: {
              display: 'flex',
              flexDirection: 'column',
              padding: '100px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
            },
            input: {
              display: 'flex',
              marginBottom: '20px',
              alignItems: 'center',
              borderRadius: '20px',
              backgroundColor: '#ccc5b9',
              paddingRight: '15px',
              paddingLeft: '15px'
            },
            header: { display: 'flex', justifyContent: 'center' },
            submitBtn: {
              marginTop: '20px',
              backgroundImage: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
              color: 'white',
              borderRadius: '25px'
            }
          };
        });
      var ke = Object(W.b)(
          function(e) {
            return { auth: e.auth.isAdmin };
          },
          function(e) {
            return {
              uploadImage: Object(G.b)(R, e),
              updateProduct: Object(G.b)(S, e)
            };
          }
        )(function(e) {
          var t = Re(),
            a = o.a.useState(null),
            n = Object(ne.a)(a, 2),
            r = n[0],
            c = n[1];
          return o.a.createElement(
            _e.a,
            {
              className: t.modal,
              open: e.open,
              onClose: e.handleClose,
              closeAfterTransition: !0,
              BackdropComponent: we.a,
              BackdropProps: { timeout: 500 }
            },
            o.a.createElement(
              Se.a,
              { in: e.open },
              o.a.createElement(
                'form',
                { className: t.form, encType: 'multipart/form-data' },
                o.a.createElement(
                  'h1',
                  { className: t.header },
                  'Upload Image'
                ),
                o.a.createElement(h.a, {
                  type: 'file',
                  name: 'file',
                  id: 'file',
                  onChange: function(e) {
                    c(e.target.files[0]);
                  },
                  disableUnderline: !0
                }),
                o.a.createElement(
                  g.a,
                  {
                    onClick: function() {
                      var t = new FormData();
                      t.append('file', r, r.name),
                        e.uploadImage(e.id, t),
                        e.handleClose();
                    },
                    className: t.submitBtn
                  },
                  'Upload'
                )
              )
            )
          );
        }),
        Ae = a(384),
        Ie = Object(re.a)(function(e) {
          return {
            modal: {
              justifyContent: 'center',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              height: '100vh'
            },
            form: {
              display: 'flex',
              flexDirection: 'column',
              padding: '100px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
            },
            input: {
              display: 'flex',
              marginBottom: '20px',
              alignItems: 'center',
              borderRadius: '20px',
              backgroundColor: '#ccc5b9',
              paddingRight: '15px',
              paddingLeft: '15px'
            },
            header: { display: 'flex', justifyContent: 'center' },
            submitBtn: {
              marginTop: '20px',
              backgroundImage: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
              color: 'white',
              borderRadius: '25px'
            }
          };
        });
      var Ne = Object(W.b)(null, function(e) {
          return { updateProduct: Object(G.b)(S, e) };
        })(function(e) {
          var t = Ie(),
            a = o.a.useState(''),
            n = Object(ne.a)(a, 2),
            r = n[0],
            c = n[1],
            i = o.a.useState(''),
            l = Object(ne.a)(i, 2),
            s = l[0],
            u = l[1],
            d = o.a.useState(''),
            m = Object(ne.a)(d, 2),
            p = m[0],
            f = m[1],
            E = o.a.useState(''),
            b = Object(ne.a)(E, 2),
            y = b[0],
            C = b[1];
          return o.a.createElement(
            'div',
            null,
            o.a.createElement(
              _e.a,
              {
                className: t.modal,
                open: e.open,
                onClose: e.handleCloseEdit,
                closeAfterTransition: !0,
                BackdropComponent: we.a,
                BackdropProps: { timeout: 500 }
              },
              o.a.createElement(
                Se.a,
                { in: e.open },
                o.a.createElement(
                  'form',
                  { className: t.form },
                  o.a.createElement(
                    'h1',
                    { className: t.header },
                    'Edit Menu Item'
                  ),
                  o.a.createElement(h.a, {
                    placeholder: 'Name',
                    className: t.input,
                    value: s,
                    onChange: function(e) {
                      u(e.target.value);
                    },
                    disableUnderline: !0
                  }),
                  o.a.createElement(
                    Ae.a,
                    {
                      placeholder: 'Category',
                      className: t.input,
                      value: r,
                      onChange: function(e) {
                        c(e.target.value);
                      },
                      disableUnderline: !0,
                      native: !0
                    },
                    o.a.createElement('option', { value: 'Coffee' }, 'Coffee'),
                    o.a.createElement(
                      'option',
                      { value: 'Beverage' },
                      'Beverage'
                    ),
                    o.a.createElement('option', { value: 'Snack' }, 'Snack'),
                    o.a.createElement('option', { value: 'Special' }, 'Special')
                  ),
                  o.a.createElement(h.a, {
                    placeholder: 'Quantiy',
                    className: t.input,
                    value: y,
                    onChange: function(e) {
                      C(e.target.value);
                    },
                    disableUnderline: !0
                  }),
                  o.a.createElement(h.a, {
                    placeholder: 'Price',
                    className: t.input,
                    value: p,
                    onChange: function(e) {
                      f(e.target.value);
                    },
                    disableUnderline: !0
                  }),
                  o.a.createElement(
                    g.a,
                    {
                      type: 'submit',
                      onClick: function(t) {
                        t.preventDefault(),
                          e.updateProduct(e.id, {
                            name: s,
                            price: p,
                            quantity: y,
                            category: r
                          }),
                          e.handleCloseEdit();
                      },
                      className: t.submitBtn
                    },
                    'Edit'
                  )
                )
              )
            )
          );
        }),
        Te = a(360),
        Ue = Object(re.a)(function(e) {
          return {
            modal: {
              justifyContent: 'center',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              height: '100vh'
            },
            form: {
              display: 'flex',
              flexDirection: 'column',
              padding: '100px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
            },
            input: {
              display: 'flex',
              marginBottom: '20px',
              alignItems: 'center',
              borderRadius: '20px',
              backgroundColor: '#ccc5b9',
              paddingRight: '15px',
              paddingLeft: '15px'
            },
            header: { display: 'flex', justifyContent: 'center' },
            submitBtn: {
              marginTop: '20px',
              backgroundImage: 'linear-gradient(45deg, #8e2de2, #4a00e0)',
              color: 'white',
              borderRadius: '25px'
            }
          };
        });
      var Pe = Object(W.b)(
          function(e) {
            return { auth: e.auth.isAdmin };
          },
          function(e) {
            return { newProduct: Object(G.b)(w, e) };
          }
        )(function(e) {
          var t = Ue(),
            a = o.a.useState(!1),
            n = Object(ne.a)(a, 2),
            r = n[0],
            c = n[1],
            i = o.a.useState(''),
            l = Object(ne.a)(i, 2),
            s = l[0],
            u = l[1],
            d = o.a.useState(''),
            m = Object(ne.a)(d, 2),
            p = m[0],
            f = m[1],
            E = o.a.useState(''),
            b = Object(ne.a)(E, 2),
            y = b[0],
            C = b[1],
            v = o.a.useState(''),
            O = Object(ne.a)(v, 2),
            x = O[0],
            j = O[1],
            _ = function() {
              c(!1);
            };
          return o.a.createElement(
            'div',
            null,
            o.a.createElement(
              g.a,
              {
                variant: 'contained',
                color: 'primary',
                onClick: function() {
                  c(!0);
                },
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }
              },
              o.a.createElement(Te.a, { style: { marginRight: '10px' } }),
              ' Add Item'
            ),
            o.a.createElement(
              _e.a,
              {
                className: t.modal,
                open: r,
                onClose: _,
                closeAfterTransition: !0,
                BackdropComponent: we.a,
                BackdropProps: { timeout: 500 }
              },
              o.a.createElement(
                Se.a,
                { in: r },
                o.a.createElement(
                  'form',
                  {
                    className: t.form,
                    onSubmit: function(t) {
                      t.preventDefault(), e.newProduct(p, y, x, s), _();
                    }
                  },
                  o.a.createElement(
                    'h1',
                    { className: t.header },
                    'Add Menu Item'
                  ),
                  o.a.createElement(h.a, {
                    placeholder: 'Name',
                    className: t.input,
                    value: p,
                    onChange: function(e) {
                      f(e.target.value);
                    },
                    disableUnderline: !0
                  }),
                  o.a.createElement(
                    Ae.a,
                    {
                      className: t.input,
                      native: !0,
                      value: s,
                      onChange: function(e) {
                        u(e.target.value);
                      },
                      disableUnderline: !0
                    },
                    o.a.createElement(
                      'option',
                      { value: 'Beverage' },
                      'Beverage'
                    ),
                    o.a.createElement('option', { value: 'Snack' }, 'Snack'),
                    o.a.createElement(
                      'option',
                      { value: 'Special' },
                      'Special'
                    ),
                    o.a.createElement('option', { value: 'Coffee' }, 'Coffee')
                  ),
                  o.a.createElement(h.a, {
                    placeholder: 'Quantiy',
                    className: t.input,
                    value: x,
                    onChange: function(e) {
                      j(e.target.value);
                    },
                    disableUnderline: !0
                  }),
                  o.a.createElement(h.a, {
                    placeholder: 'Price',
                    className: t.input,
                    value: y,
                    onChange: function(e) {
                      C(e.target.value);
                    },
                    disableUnderline: !0
                  }),
                  o.a.createElement(
                    g.a,
                    { type: 'submit', className: t.submitBtn },
                    'Add'
                  )
                )
              )
            )
          );
        }),
        Be = Object(fe.a)(function(e) {
          return {
            head: {
              backgroundColor: e.palette.common.black,
              color: e.palette.common.white
            },
            body: { fontSize: 14 }
          };
        })(Ee.a),
        De = Object(fe.a)(function(e) {
          return {
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: e.palette.background.default
              }
            }
          };
        })(he.a),
        Le = { table: { minWidth: 700 } },
        Fe = (function(e) {
          function t() {
            var e, a;
            Object(l.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(u.a)(
                this,
                (e = Object(d.a)(t)).call.apply(e, [this].concat(r))
              )).state = { open: !1, openEdit: !1, product: {} }),
              (a.handleOpen = function(e) {
                a.setState({ open: !0, id: e });
              }),
              (a.handleClose = function() {
                a.setState({ open: !1 });
              }),
              (a.handleEditOpen = function(e) {
                a.setState({ openEdit: !0, id: e._id, product: e });
              }),
              (a.handleCloseEdit = function() {
                a.setState({ openEdit: !1 });
              }),
              a
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.fetchProducts();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e,
                    t = this;
                  e = ''.concat(
                    Object({
                      NODE_ENV: 'production',
                      PUBLIC_URL: '',
                      REACT_APP_JWT_SECRET: 'secretKey'
                    }).REACT_APP_MONGO_API_BASE_URI,
                    '/image'
                  );
                  var a = this.props.products.map(function(a) {
                    return o.a.createElement(
                      De,
                      { key: a._id },
                      o.a.createElement(
                        Be,
                        { component: 'th', scope: 'row' },
                        a.productName
                      ),
                      o.a.createElement(Be, { align: 'center' }, a.category),
                      o.a.createElement(Be, { align: 'center' }, a.quantity),
                      o.a.createElement(Be, { align: 'center' }, '$', a.price),
                      o.a.createElement(
                        Be,
                        { align: 'center' },
                        null !== a.image
                          ? o.a.createElement(
                              'div',
                              null,
                              o.a.createElement(
                                'a',
                                {
                                  style: { textDecoration: 'none' },
                                  href: ''.concat(e, '/').concat(a.image)
                                },
                                'View'
                              ),
                              o.a.createElement(pe.a, {
                                orientation: 'vertical'
                              }),
                              o.a.createElement(
                                'a',
                                {
                                  style: { textDecoration: 'none' },
                                  href: '#',
                                  onClick: function() {
                                    return t.handleOpen(a._id);
                                  }
                                },
                                'Change'
                              )
                            )
                          : o.a.createElement(
                              g.a,
                              {
                                size: 'small',
                                onClick: function() {
                                  return t.handleOpen(a._id);
                                },
                                style: { margin: 0 }
                              },
                              'Upload Image'
                            )
                      ),
                      o.a.createElement(
                        Be,
                        { align: 'center' },
                        ' ',
                        o.a.createElement(
                          ge.a,
                          {
                            onClick: function() {
                              return t.props.deleteProduct(a._id);
                            }
                          },
                          o.a.createElement(xe.a, null)
                        ),
                        ' ',
                        o.a.createElement(
                          ge.a,
                          {
                            onClick: function() {
                              return t.handleEditOpen(a);
                            }
                          },
                          o.a.createElement(je.a, null)
                        )
                      )
                    );
                  });
                  return o.a.createElement(
                    'div',
                    null,
                    o.a.createElement(Pe, null),
                    o.a.createElement(
                      be.a,
                      { component: ye.a },
                      o.a.createElement(
                        Ce.a,
                        { style: Le.table, 'aria-label': 'customized table' },
                        o.a.createElement(
                          ve.a,
                          null,
                          o.a.createElement(
                            he.a,
                            null,
                            o.a.createElement(Be, null, 'Product Name'),
                            o.a.createElement(
                              Be,
                              { align: 'center' },
                              'Category'
                            ),
                            o.a.createElement(Be, { align: 'center' }, 'Stock'),
                            o.a.createElement(Be, { align: 'center' }, 'Price'),
                            o.a.createElement(Be, { align: 'center' }, 'Image'),
                            o.a.createElement(Be, { align: 'center' }, 'Action')
                          )
                        ),
                        o.a.createElement(Oe.a, null, a),
                        o.a.createElement(ke, {
                          id: this.state.id,
                          open: this.state.open,
                          handleClose: function() {
                            return t.handleClose();
                          }
                        }),
                        o.a.createElement(Ne, {
                          id: this.state.id,
                          open: this.state.openEdit,
                          handleCloseEdit: function() {
                            return t.handleCloseEdit();
                          }
                        })
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(o.a.Component),
        Ve = Object(W.b)(
          function(e) {
            return {
              products: e.products.products,
              product: e.products.product
            };
          },
          function(e) {
            return {
              fetchProducts: Object(G.b)(j, e),
              deleteProduct: Object(G.b)(_, e)
            };
          }
        )(Fe),
        Me = a(375),
        We = a(377),
        Ge = a(378),
        Je = (function(e) {
          function t() {
            return (
              Object(l.a)(this, t),
              Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.fetchOrders();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = 0;
                  return (
                    this.props.orders.forEach(function(t) {
                      e += t.cost;
                    }),
                    o.a.createElement(
                      'div',
                      null,
                      o.a.createElement('h1', null, 'Analytics'),
                      o.a.createElement('h3', null, 'Total Revenue: $', e)
                    )
                  );
                }
              }
            ]),
            t
          );
        })(o.a.Component),
        qe = Object(W.b)(
          function(e) {
            return { orders: e.orders.orders };
          },
          {
            fetchOrders: function() {
              return function(e) {
                fetch(x)
                  .then(function(e) {
                    return e.json();
                  })
                  .then(function(t) {
                    return e({ type: 'FETCH_ORDERS', payload: t });
                  });
              };
            }
          }
        )(Je),
        ze = Object(re.a)(function(e) {
          return {
            root: { display: 'flex' },
            appBar: { zIndex: e.zIndex.drawer + 1 },
            drawer: { width: 240, flexShrink: 0 },
            drawerPaper: { width: 240 },
            content: { flexGrow: 1, padding: e.spacing(3) },
            toolbar: e.mixins.toolbar
          };
        });
      var He = Object(W.b)(null, function(e) {
          return { logOut: Object(G.b)(L, e) };
        })(function(e) {
          var t = ze(),
            a = o.a.useState(!1),
            n = Object(ne.a)(a, 2),
            r = n[0],
            c = n[1],
            i = o.a.useState('Inventory'),
            l = Object(ne.a)(i, 2),
            s = l[0],
            u = l[1];
          return r
            ? o.a.createElement(p.a, { to: '/' })
            : o.a.createElement(
                'div',
                null,
                o.a.createElement(
                  'div',
                  { className: t.root },
                  o.a.createElement(oe.a, null),
                  o.a.createElement(
                    ce.a,
                    { position: 'fixed', className: t.appBar },
                    o.a.createElement(
                      ie.a,
                      { style: { justifyContent: 'space-between' } },
                      o.a.createElement(
                        Z.a,
                        { variant: 'h6', noWrap: !0 },
                        'Administrator Dashboard'
                      ),
                      o.a.createElement(
                        g.a,
                        {
                          style: { color: 'white' },
                          onClick: function() {
                            return e.logOut();
                          }
                        },
                        'Log Out'
                      )
                    )
                  ),
                  o.a.createElement(
                    le.a,
                    {
                      className: t.drawer,
                      variant: 'permanent',
                      classes: { paper: t.drawerPaper }
                    },
                    o.a.createElement('div', { className: t.toolbar }),
                    o.a.createElement(
                      se.a,
                      null,
                      o.a.createElement(
                        ue.a,
                        {
                          button: !0,
                          onClick: function() {
                            return c(!0);
                          }
                        },
                        o.a.createElement(
                          de.a,
                          null,
                          o.a.createElement(Me.a, null)
                        ),
                        o.a.createElement(me.a, { primary: 'Home' })
                      ),
                      ['Inventory', 'Analytics'].map(function(e, t) {
                        return o.a.createElement(
                          ue.a,
                          {
                            button: !0,
                            key: e,
                            onClick: function() {
                              u(e);
                            }
                          },
                          o.a.createElement(
                            de.a,
                            null,
                            t % 2 === 0
                              ? o.a.createElement(We.a, null)
                              : o.a.createElement(Ge.a, null)
                          ),
                          o.a.createElement(me.a, { primary: e })
                        );
                      })
                    ),
                    o.a.createElement(pe.a, null)
                  ),
                  o.a.createElement(
                    'main',
                    { className: t.content },
                    o.a.createElement('div', { className: t.toolbar }),
                    'Inventory' === s ? o.a.createElement(Ve, null) : null,
                    'Analytics' === s ? o.a.createElement(qe, null) : null
                  )
                )
              );
        }),
        Ke = a(179),
        $e = JSON.parse(localStorage.getItem('isAdmin')),
        Xe = Object(W.b)(function(e) {
          return { auth: e.auth.isAdmin };
        }, {})(function(e) {
          var t = e.Component,
            a = e.auth,
            n = Object(Ke.a)(e, ['Component', 'auth']);
          return !0 === a || !0 === $e
            ? o.a.createElement(
                p.b,
                Object.assign({}, n, {
                  render: function(e) {
                    return o.a.createElement(t, e);
                  }
                })
              )
            : o.a.createElement(p.a, { to: '/login' });
        }),
        Qe = a(379),
        Ye = a(89),
        Ze = Object(re.a)(function(e) {
          return {
            modal: {
              justifyContent: 'center',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              height: '100vh'
            },
            root: {
              maxWidth: 340,
              boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)'
            },
            media: { height: 0, paddingTop: '56.25%' },
            expand: {
              transform: 'rotate(0deg)',
              marginLeft: 'auto',
              transition: e.transitions.create('transform', {
                duration: e.transitions.duration.shortest
              })
            },
            expandOpen: { transform: 'rotate(180deg)' },
            avatar: { backgroundColor: Ye.a[500] },
            modalMessage: {
              display: 'flex',
              flexDirection: 'column',
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
            }
          };
        });
      var et = Object(W.b)(
          function(e) {
            return { cart: e.orders.cart, user: e.auth.user };
          },
          function(e) {
            return {
              addToCart: Object(G.b)(A, e),
              calculateCost: Object(G.b)(I, e)
            };
          }
        )(function(e) {
          var t = Ze(),
            a = o.a.useState(!1),
            n = Object(ne.a)(a, 2),
            r = n[0],
            c = n[1],
            i = o.a.useState(''),
            l = Object(ne.a)(i, 2),
            s = l[0],
            u = l[1],
            d = o.a.useState(0),
            m = Object(ne.a)(d, 2),
            p = m[0],
            f = m[1];
          return o.a.createElement(
            X.a,
            { className: t.root },
            o.a.createElement(Q.a, {
              className: t.media,
              image: e.image,
              title: e.title
            }),
            o.a.createElement(
              Y.a,
              { title: e.title },
              o.a.createElement(
                'h4',
                {
                  style: {
                    margin: '0',
                    marginBottom: '5px',
                    fontFamily: 'Courgette, sans-serif'
                  }
                },
                e.title
              ),
              o.a.createElement(
                Z.a,
                { variant: 'body2', color: 'textSecondary', component: 'p' },
                '$',
                e.price
              )
            ),
            o.a.createElement(
              Qe.a,
              { style: { justifyContent: 'space-between' } },
              o.a.createElement(h.a, {
                type: 'number',
                style: { width: '75px' },
                placeholder: 'Amount',
                value: p,
                onChange: function(e) {
                  f(e.target.value);
                }
              }),
              o.a.createElement(
                g.a,
                {
                  variant: 'depressed',
                  onClick: function() {
                    return (
                      (t = e.item),
                      void (void 0 !== localStorage.user
                        ? p <= 0
                          ? (u('Amount Should be Greater Than Zero'), c(!0))
                          : (e.addToCart(t, p),
                            setTimeout(e.calculateCost(t._id, t.price, p), 3e3))
                        : (u('Please Log In'), c(!0)))
                    );
                    var t;
                  }
                },
                'Add To Cart'
              )
            ),
            o.a.createElement(
              _e.a,
              {
                className: t.modal,
                open: r,
                onClose: function() {
                  c(!1);
                },
                closeAfterTransition: !0,
                BackdropComponent: we.a,
                BackdropProps: { timeout: 500 }
              },
              o.a.createElement('div', { className: t.modalMessage }, s)
            )
          );
        }),
        tt = a(321),
        at = a(13),
        nt = a(380),
        rt = Object(re.a)(function(e) {
          return {
            search: Object(f.a)(
              {
                position: 'relative',
                borderRadius: e.shape.borderRadius,
                backgroundColor: Object(at.b)(e.palette.common.black, 0.1),
                '&:hover': {
                  backgroundColor: Object(at.b)(e.palette.common.black, 0.2)
                },
                marginLeft: 0,
                width: '100%'
              },
              e.breakpoints.up('sm'),
              { marginLeft: e.spacing(1), width: 'auto' }
            ),
            searchIcon: {
              padding: e.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            },
            inputRoot: { color: 'inherit' },
            inputInput: Object(f.a)(
              {
                padding: e.spacing(1, 1, 1, 7),
                transition: e.transitions.create('width'),
                width: '100%'
              },
              e.breakpoints.up('sm'),
              { width: 120, '&:focus': { width: 200 } }
            )
          };
        });
      var ot = function(e) {
          var t = rt();
          return o.a.createElement(
            'div',
            { className: t.search },
            o.a.createElement(
              'div',
              { className: t.searchIcon },
              o.a.createElement(nt.a, null)
            ),
            o.a.createElement(tt.a, {
              placeholder: 'Search\u2026',
              classes: { root: t.inputRoot, input: t.inputInput },
              inputProps: { 'aria-label': 'search' },
              onChange: e.handleSearchItem
            })
          );
        },
        ct = (function(e) {
          function t() {
            var e, a;
            Object(l.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(u.a)(
                this,
                (e = Object(d.a)(t)).call.apply(e, [this].concat(r))
              )).state = { category: 'all', searchItem: '' }),
              (a.changeMenuItems = function(e) {
                a.setState({ category: e });
              }),
              (a.handleSearchItem = function(e) {
                a.setState({ searchItem: e.target.value });
              }),
              a
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.props.fetchProducts();
                }
              },
              {
                key: 'render',
                value: function() {
                  var e,
                    t = this;
                  e = ''.concat(
                    Object({
                      NODE_ENV: 'production',
                      PUBLIC_URL: '',
                      REACT_APP_JWT_SECRET: 'secretKey'
                    }).REACT_APP_MONGO_API_BASE_URI,
                    '/image'
                  );
                  var a = this.props.products,
                    n = this.state.searchItem,
                    r = a.map(function(t) {
                      return o.a.createElement(
                        $.a,
                        { item: !0, key: t._id },
                        o.a.createElement(et, {
                          item: t,
                          title: t.productName,
                          price: t.price,
                          image: ''.concat(e, '/').concat(t.image),
                          currentStock: t.quantity
                        })
                      );
                    }),
                    c = a
                      .filter(function(e) {
                        return 'Snack' === e.category;
                      })
                      .map(function(t) {
                        return o.a.createElement(
                          $.a,
                          { item: !0, key: t._id },
                          o.a.createElement(et, {
                            item: t,
                            title: t.productName,
                            price: t.price,
                            image: ''.concat(e, '/').concat(t.image)
                          })
                        );
                      }),
                    i = a
                      .filter(function(e) {
                        return 'Coffee' === e.category;
                      })
                      .map(function(t) {
                        return o.a.createElement(
                          $.a,
                          { item: !0, key: t._id },
                          o.a.createElement(et, {
                            item: t,
                            title: t.productName,
                            price: t.price,
                            image: ''.concat(e, '/').concat(t.image)
                          })
                        );
                      }),
                    l = a
                      .filter(function(e) {
                        return 'Beverage' === e.category;
                      })
                      .map(function(t) {
                        return o.a.createElement(
                          $.a,
                          { item: !0, key: t._id },
                          o.a.createElement(et, {
                            item: t,
                            title: t.productName,
                            price: t.price,
                            image: ''.concat(e, '/').concat(t.image)
                          })
                        );
                      }),
                    s = a
                      .filter(function(e) {
                        return 'Special' === e.category;
                      })
                      .map(function(t) {
                        return o.a.createElement(
                          $.a,
                          { item: !0, key: t._id },
                          o.a.createElement(et, {
                            item: t,
                            title: t.productName,
                            price: t.price,
                            image: ''.concat(e, '/').concat(t.image)
                          })
                        );
                      }),
                    u = a
                      .filter(function(e) {
                        return e.productName
                          .toLowerCase()
                          .includes(t.state.searchItem);
                      })
                      .map(function(t) {
                        return o.a.createElement(
                          $.a,
                          { item: !0, key: t._id },
                          o.a.createElement(et, {
                            item: t,
                            title: t.productName,
                            price: t.price,
                            image: ''.concat(e, '/').concat(t.image)
                          })
                        );
                      });
                  return o.a.createElement(
                    'div',
                    { style: { padding: 16, marginTop: 60 } },
                    o.a.createElement(
                      $.a,
                      {
                        container: !0,
                        spacing: 4,
                        justify: 'center',
                        alignItems: 'center',
                        style: { width: '60%', margin: 'auto' }
                      },
                      o.a.createElement(
                        $.a,
                        { container: !0, justify: 'center' },
                        o.a.createElement(
                          $.a,
                          { item: !0 },
                          o.a.createElement(
                            g.a,
                            {
                              onClick: function() {
                                return t.changeMenuItems('all');
                              }
                            },
                            o.a.createElement(
                              'h3',
                              { style: lt.choices },
                              'All'
                            )
                          )
                        ),
                        o.a.createElement(
                          $.a,
                          { item: !0 },
                          o.a.createElement(
                            g.a,
                            {
                              onClick: function() {
                                return t.changeMenuItems('coffee');
                              }
                            },
                            o.a.createElement(
                              'h3',
                              { style: lt.choices },
                              'Coffee'
                            )
                          )
                        ),
                        o.a.createElement(
                          $.a,
                          { item: !0 },
                          o.a.createElement(
                            g.a,
                            {
                              onClick: function() {
                                return t.changeMenuItems('beverages');
                              }
                            },
                            o.a.createElement(
                              'h3',
                              { style: lt.choices },
                              'Beverages'
                            )
                          )
                        ),
                        o.a.createElement(
                          $.a,
                          { item: !0 },
                          o.a.createElement(
                            g.a,
                            {
                              onClick: function() {
                                return t.changeMenuItems('snacks');
                              }
                            },
                            o.a.createElement(
                              'h3',
                              { style: lt.choices },
                              'Snacks'
                            )
                          )
                        ),
                        o.a.createElement(
                          $.a,
                          { item: !0 },
                          o.a.createElement(
                            g.a,
                            {
                              onClick: function() {
                                return t.changeMenuItems('specials');
                              }
                            },
                            o.a.createElement(
                              'h3',
                              { style: lt.choices },
                              'Specials'
                            )
                          )
                        )
                      ),
                      o.a.createElement(
                        $.a,
                        { container: !0, justify: 'center' },
                        o.a.createElement(ot, {
                          handleSearchItem: this.handleSearchItem
                        })
                      ),
                      '' !== n ? u : null,
                      'specials' === this.state.category && '' === n ? s : null,
                      'all' === this.state.category && '' === n ? r : null,
                      'coffee' === this.state.category && '' === n ? i : null,
                      'beverages' === this.state.category && '' === n
                        ? l
                        : null,
                      'snacks' === this.state.category && '' === n ? c : null
                    )
                  );
                }
              }
            ]),
            t
          );
        })(o.a.Component),
        it = Object(W.b)(
          function(e) {
            return {
              products: e.products.products,
              cart: e.orders.cart,
              user: e.auth.user
            };
          },
          function(e) {
            return { fetchProducts: Object(G.b)(j, e) };
          }
        )(ct),
        lt = { choices: { fontFamily: 'Courgette, sans-serif' } },
        st = a(381),
        ut = (function(e) {
          function t(e) {
            var a;
            return (
              Object(l.a)(this, t),
              ((a = Object(u.a)(
                this,
                Object(d.a)(t).call(this, e)
              )).handleOpen = function(e) {
                a.setState({ open: !0 });
              }),
              (a.handleClose = function(e) {
                a.props.setNewUserNull();
              }),
              (a.handleChange = function(e) {
                e.preventDefault();
                var t = e.target,
                  n = t.name,
                  r = t.value;
                a.setState(Object(f.a)({}, n, r), function() {
                  a.validateField(n, r);
                });
              }),
              (a.validateField = function(e, t) {
                var n = a.state.formErrors,
                  r = a.state.passwordValid,
                  o = a.state.disabilityValid,
                  c = a.state.usernameValid,
                  i = '';
                switch (e) {
                  case 'userName':
                    (c = t.length >= 3),
                      (n.userName = c ? '' : 'Name is too short');
                    break;
                  case 'password':
                    (r = t.length >= 6),
                      (n.password = r ? '' : 'Password is too short');
                    break;
                  case 'disability':
                    (o = t.length >= 3),
                      (n.disability = o ? '' : 'Disability is too short');
                    break;
                  default:
                    (i = 'Just needed a default case lol'), console.log(i);
                }
                a.setState(
                  {
                    formErrors: n,
                    passwordValid: r,
                    usernameValid: c,
                    disabilityValid: o
                  },
                  a.validateForm
                );
              }),
              (a.validateForm = function() {
                a.setState({
                  formValid:
                    a.state.usernameValid &&
                    a.state.passwordValid &&
                    a.state.disabilityValid
                });
              }),
              (a.handleSubmit = function(e) {
                e.preventDefault();
                var t = a.state,
                  n = t.userName,
                  r = t.password,
                  o = t.disability;
                a.props.registerUser(n, r, o), a.setState({ open: !0 });
              }),
              (a.state = {
                userName: '',
                password: '',
                disability: '',
                usernameValid: !1,
                passwordValid: !1,
                disabilityValid: !1,
                formErrors: { userName: '', password: '', disability: '' },
                formValid: !1,
                redirect: !1,
                open: !1
              }),
              a
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'render',
                value: function() {
                  var e = this.state,
                    t = e.userName,
                    a = e.password,
                    n = e.disability,
                    r = e.formErrors,
                    c = e.formValid,
                    i = this.props,
                    l = i.registrationError,
                    s = i.newUser;
                  return o.a.createElement(
                    E.a,
                    {
                      style: {
                        justifyContent: 'center',
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center'
                      },
                      maxWidth: 'sm'
                    },
                    o.a.createElement(
                      'form',
                      { onSubmit: this.handleSubmit, style: mt.form },
                      o.a.createElement('h1', { style: mt.header }, 'Register'),
                      null !== l
                        ? o.a.createElement(
                            'div',
                            { style: { color: 'red', margin: 'auto' } },
                            'Registration Failed'
                          )
                        : null,
                      o.a.createElement(J, { formErrors: r }),
                      o.a.createElement(
                        'div',
                        { style: mt.input },
                        o.a.createElement(b.a, {
                          fontSize: 'small',
                          style: mt.icon
                        }),
                        o.a.createElement(h.a, {
                          placeholder: 'Username',
                          value: t,
                          name: 'userName',
                          onChange: this.handleChange,
                          disableUnderline: !0
                        })
                      ),
                      o.a.createElement(
                        'div',
                        { style: mt.input },
                        o.a.createElement(y.a, {
                          fontSize: 'small',
                          style: mt.icon
                        }),
                        o.a.createElement(h.a, {
                          placeholder: 'Password',
                          value: a,
                          type: 'password',
                          name: 'password',
                          onChange: this.handleChange,
                          disableUnderline: !0
                        })
                      ),
                      o.a.createElement(
                        'div',
                        { style: mt.input },
                        o.a.createElement(st.a, {
                          fontSize: 'small',
                          style: mt.icon
                        }),
                        o.a.createElement(h.a, {
                          placeholder: 'Disability',
                          value: n,
                          name: 'disability',
                          onChange: this.handleChange,
                          disableUnderline: !0
                        })
                      ),
                      o.a.createElement(
                        g.a,
                        { type: 'submit', style: mt.submitBtn, disabled: !c },
                        'Submit'
                      )
                    ),
                    o.a.createElement(
                      _e.a,
                      {
                        style: mt.modal,
                        open: null !== s,
                        onClose: this.handleClose,
                        closeAfterTransition: !0,
                        BackdropComponent: we.a,
                        BackdropProps: { timeout: 500 }
                      },
                      o.a.createElement(
                        'div',
                        { style: mt.modalMessage },
                        o.a.createElement('h3', null, ' Registered '),
                        o.a.createElement(
                          'h5',
                          null,
                          ' You can now proceed to login! '
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(o.a.Component),
        dt = Object(W.b)(
          function(e) {
            return {
              auth: e.auth.isAdmin,
              newUser: e.auth.newUser,
              registrationError: e.auth.registrationError
            };
          },
          function(e) {
            return {
              registerUser: Object(G.b)(F, e),
              setNewUserNull: Object(G.b)(M, e)
            };
          }
        )(ut),
        mt = {
          form: {
            display: 'flex',
            flexDirection: 'column',
            padding: '100px',
            backgroundColor: 'white'
          },
          header: {
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Courgette, sans-serif'
          },
          input: {
            display: 'flex',
            marginBottom: '20px',
            alignItems: 'center',
            borderRadius: '20px',
            backgroundColor: '#ccc5b9',
            paddingRight: '15px',
            paddingLeft: '15px'
          },
          submitBtn: {
            marginTop: '20px',
            background: '#e35b2d',
            color: 'white',
            borderRadius: '25px'
          },
          icon: { marginRight: '15px' },
          modalMessage: {
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
          },
          modal: {
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            height: '100vh'
          }
        },
        pt = a(382),
        ft = a(383);
      var Et = Object(W.b)(
          function(e) {
            return {
              cart: e.orders.cart,
              user: e.auth.user,
              canAfford: e.orders.canAfford,
              accountBalance: e.orders.accountBalance,
              totalCost: e.orders.totalCost
            };
          },
          function(e) {
            return {
              removeFromCart: Object(G.b)(N, e),
              placeOrder: Object(G.b)(T, e)
            };
          }
        )(function(e) {
          var t = o.a.useState(!1),
            a = Object(ne.a)(t, 2),
            n = a[0],
            r = a[1],
            c = o.a.useState(!1),
            i = Object(ne.a)(c, 2),
            l = i[0],
            s = i[1],
            u = o.a.useState(''),
            d = Object(ne.a)(u, 2),
            m = d[0],
            p = d[1],
            f = function() {
              e.placeOrder(e.user, e.cart, e.totalCost, e.accountBalance),
                (function(e) {
                  s(n), p(e);
                })('Order Successful');
            },
            E = e.cart.length;
          return o.a.createElement(
            'div',
            null,
            o.a.createElement(
              ge.a,
              {
                style: { color: '#e35b2d' },
                onClick: function() {
                  r(!0);
                }
              },
              o.a.createElement(pt.a, null),
              o.a.createElement('div', null, E)
            ),
            o.a.createElement(
              le.a,
              {
                anchor: 'right',
                open: n,
                onClose: function() {
                  r(!1);
                },
                style: { display: 'flex', justifyContent: 'center' }
              },
              void 0 !== e.user
                ? o.a.createElement(
                    'h3',
                    {
                      style: {
                        fontFamily: 'Courgette, san-serif',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginBottom: '5px'
                      }
                    },
                    e.user.userName
                  )
                : null,
              void 0 !== e.user
                ? o.a.createElement(
                    'h4',
                    {
                      style: {
                        fontFamily: 'Courgette, san-serif',
                        marginTop: '0px',
                        marginLeft: '10px'
                      }
                    },
                    'Balance: $',
                    e.accountBalance
                  )
                : null,
              !0 !== e.canAfford
                ? o.a.createElement(
                    'h5',
                    {
                      style: {
                        fontFamily: 'Courgette, san-serif',
                        color: 'red'
                      }
                    },
                    'Account Balance too low'
                  )
                : null,
              o.a.createElement(
                se.a,
                { style: { width: '250px' } },
                e.cart.map(function(t) {
                  return o.a.createElement(
                    ue.a,
                    {
                      button: !0,
                      key: t.product._id,
                      style: {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }
                    },
                    o.a.createElement(
                      'h3',
                      { style: { fontFamily: 'Courgette, sans-serif' } },
                      t.quantity,
                      ' ',
                      t.product.productName
                    ),
                    o.a.createElement(
                      'div',
                      null,
                      '$',
                      t.cost,
                      o.a.createElement(
                        ge.a,
                        {
                          onClick: function() {
                            return e.removeFromCart(t.product._id);
                          }
                        },
                        o.a.createElement(xe.a, null)
                      )
                    )
                  );
                }),
                o.a.createElement(
                  ue.a,
                  {
                    style: {
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }
                  },
                  o.a.createElement(
                    'h3',
                    {
                      style: {
                        fontFamily: 'Courgette, sans-serif',
                        display: 'flex',
                        alignItems: 'center'
                      }
                    },
                    o.a.createElement(ft.a, null),
                    'Total Cost'
                  ),
                  '$',
                  e.totalCost
                )
              ),
              o.a.createElement(
                g.a,
                {
                  style: {
                    width: '75%',
                    display: 'flex',
                    backgroundColor: '#316e8f',
                    margin: '10px auto',
                    color: 'white'
                  },
                  disabled: e.cart.length <= 0 || !1 === e.canAfford,
                  onClick: function() {
                    f();
                  }
                },
                'Place Order'
              ),
              o.a.createElement(
                _e.a,
                {
                  style: ht.modal,
                  open: l,
                  onClose: function() {
                    s(!1);
                  },
                  closeAfterTransition: !0,
                  BackdropComponent: we.a,
                  BackdropProps: { timeout: 500 }
                },
                o.a.createElement(
                  'div',
                  { style: ht.modalMessage },
                  o.a.createElement('h1', null, m)
                )
              )
            )
          );
        }),
        ht = {
          modalMessage: {
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0px 0px 9px 0px rgba(0,0,0,0.7)'
          },
          modal: {
            justifyContent: 'center',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            height: '100vh'
          }
        },
        gt = {
          title: {
            textAlign: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Courgette, sans-serif',
            color: 'black'
          },
          root: { flexGrow: 1 },
          toolbar: { display: 'flex', justifyContent: 'space-between' },
          content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          },
          links: {
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            alignItems: 'center'
          },
          btn: {
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Courgette, sans-serif'
          },
          bar: { display: 'flex', flexDirection: 'column' },
          appBar: { backgroundColor: 'white' }
        },
        bt = (function(e) {
          function t() {
            return (
              Object(l.a)(this, t),
              Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return o.a.createElement(
                    'div',
                    { className: gt.root },
                    o.a.createElement(
                      ce.a,
                      { position: 'fixed', style: gt.appBar },
                      o.a.createElement(
                        ie.a,
                        { style: gt.toolbar },
                        o.a.createElement(
                          Z.a,
                          { variant: 'h6', style: gt.title },
                          o.a.createElement('img', {
                            src: a(316),
                            width: '70px',
                            alt: 'Cups Logo'
                          })
                        ),
                        o.a.createElement(
                          'div',
                          { style: gt.content },
                          o.a.createElement(
                            C.b,
                            { to: '/', style: gt.links },
                            o.a.createElement(
                              g.a,
                              { color: 'inherit', style: gt.btn },
                              'Home'
                            )
                          ),
                          o.a.createElement(
                            C.b,
                            { to: '/menu', style: gt.links },
                            o.a.createElement(
                              g.a,
                              { color: 'inherit', style: gt.btn },
                              'Menu'
                            )
                          ),
                          void 0 !== localStorage.user
                            ? o.a.createElement(
                                g.a,
                                {
                                  onClick: function() {
                                    e.props.logOut(),
                                      e.props.removeAllFromCart();
                                  },
                                  style: gt.btn
                                },
                                'Log out'
                              )
                            : o.a.createElement(
                                C.b,
                                { to: '/login', style: gt.links },
                                o.a.createElement(
                                  g.a,
                                  { color: 'inherit', style: gt.btn },
                                  'Login'
                                )
                              ),
                          o.a.createElement(Et, null)
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(o.a.Component),
        yt = Object(W.b)(
          function(e) {
            return { user: e.auth.user };
          },
          function(e) {
            return {
              logOut: Object(G.b)(L, e),
              removeAllFromCart: Object(G.b)(U, e)
            };
          }
        )(bt);
      var Ct = { container: { color: 'black' } },
        vt = function() {
          return o.a.createElement(
            $.a,
            {
              container: !0,
              justify: 'center',
              style: Ct.container,
              spacing: 0
            },
            o.a.createElement(
              $.a,
              { item: !0 },
              o.a.createElement('h4', null, '@Cups Incorporated')
            )
          );
        },
        Ot = (function(e) {
          function t() {
            return (
              Object(l.a)(this, t),
              Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(m.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'render',
                value: function() {
                  return o.a.createElement(
                    'div',
                    null,
                    o.a.createElement(yt, null),
                    o.a.createElement(
                      p.d,
                      null,
                      o.a.createElement(p.b, {
                        path: '/',
                        exact: !0,
                        component: ae
                      }),
                      o.a.createElement(p.b, { path: '/login', component: H }),
                      o.a.createElement(Xe, { path: '/admin', component: He }),
                      o.a.createElement(p.b, { path: '/menu', component: it }),
                      o.a.createElement(p.b, {
                        path: '/register',
                        component: dt
                      }),
                      o.a.createElement(p.a, { to: '/' })
                    ),
                    o.a.createElement(vt, null)
                  );
                }
              }
            ]),
            t
          );
        })(o.a.Component);
      var xt = Object(W.b)(
        function(e) {
          return { auth: e.auth, products: e.products };
        },
        function(e) {
          return Object(G.b)({ authorizeUser: D, fetchProducts: j }, e);
        }
      )(Ot);
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      var jt = a(178),
        _t = a(17),
        wt = {
          isAdmin: !1,
          user: void 0,
          loginError: null,
          registrationError: null,
          newUser: null
        },
        St = a(65),
        Rt = { products: [], product: {} },
        kt = {
          cart: [],
          product: '',
          totalCost: 0,
          orders: [],
          canAfford: !0,
          accountBalance: 0,
          error: null
        },
        At = Object(G.c)({
          auth: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : wt,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'AUTH_USER':
                return Object(_t.a)({}, e, {
                  isAdmin: t.payload.user.isAdmin,
                  user: t.payload.user,
                  loginError: null
                });
              case 'AUTH_USER_FAILURE':
                return Object(_t.a)({}, e, { loginError: t.payload.message });
              case 'LOG_OUT':
                return Object(_t.a)({}, e, { isAdmin: !1, user: void 0 });
              case 'REGISTER_USER':
                return Object(_t.a)({}, e, { newUser: t.payload });
              case 'REGISTER_USER_FAILURE':
                return Object(_t.a)({}, e, { registrationError: t.payload });
              case 'SET_NEW_USER_NULL':
                return Object(_t.a)({}, e, { newUser: null });
              default:
                return e;
            }
          },
          products: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : Rt,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'FETCH_PRODUCTS':
                return Object(_t.a)({}, e, { products: t.payload });
              case 'FETCH_ONE_PRODUCT':
                return Object(_t.a)({}, e, { product: t.payload });
              case 'DELETE_PRODUCT':
                return (
                  (e.products = e.products.filter(function(e) {
                    return e._id !== t.payload;
                  })),
                  Object(_t.a)({}, e, { products: Object(St.a)(e.products) })
                );
              case 'NEW_PRODUCT':
                return (
                  e.products.unshift(t.payload),
                  Object(_t.a)({}, e, { product: t.payload })
                );
              case 'UPDATE_PRODUCT':
                return (
                  e.products.forEach(function(e, a, n) {
                    e._id === t.payload._id && (n[a] = t.payload);
                  }),
                  Object(_t.a)({}, e, { products: Object(St.a)(e.products) })
                );
              default:
                return e;
            }
          },
          orders: function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : kt,
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'FETCH_ACCOUNT_BALANCE':
                return Object(_t.a)({}, e, { accountBalance: t.payload });
              case 'FETCH_ORDERS':
                return Object(_t.a)({}, e, { orders: t.payload });
              case 'ADD_TO_CART':
                return (
                  e.cart.push({ product: t.productId, quantity: t.quantity }),
                  Object(_t.a)({}, e, { cart: Object(St.a)(e.cart) })
                );
              case 'REMOVE_FROM_CART':
                var a = e.cart.filter(function(e) {
                  return e.product._id !== t.payload;
                });
                e.cart = a;
                var n = 0;
                e.cart.forEach(function(e) {
                  n += parseInt(e.cost);
                });
                var r = e.accountBalance < n;
                return Object(_t.a)({}, e, {
                  product: t.payload,
                  totalCost: n,
                  canAfford: !r
                });
              case 'PLACE_ORDER':
                var o = 0;
                return (
                  (o = e.accountBalance - e.totalCost),
                  Object(_t.a)({}, e, {
                    cart: [],
                    totalCost: 0,
                    accountBalance: o
                  })
                );
              case 'PLACE_ORDER_FAILURE':
                return Object(_t.a)({}, e, { error: t.payload });
              case 'REMOVE_ALL_FROM_CART':
                var c = 0;
                return (
                  e.cart.forEach(function(e) {
                    c += parseInt(e.cost);
                  }),
                  Object(_t.a)({}, e, { cart: [], totalCost: c })
                );
              case 'CALCULATE_COST':
                e.cart.forEach(function(e, a, n) {
                  e.product._id === t.productId && (n[a].cost = t.cost);
                });
                var i = 0;
                e.cart.forEach(function(e) {
                  i += parseInt(e.cost);
                });
                var l = e.accountBalance < i;
                return Object(_t.a)({}, e, {
                  cart: Object(St.a)(e.cart),
                  totalCost: i,
                  canAfford: !l
                });
              default:
                return e;
            }
          }
        }),
        It = [jt.a],
        Nt = Object(G.e)(
          At,
          {},
          Object(G.d)(
            G.a.apply(void 0, It),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__()
          )
        );
      i.a.render(
        o.a.createElement(
          W.a,
          { store: Nt },
          o.a.createElement(C.a, null, o.a.createElement(xt, null))
        ),
        document.getElementById('root')
      ),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    }
  },
  [[186, 1, 2]]
]);
//# sourceMappingURL=main.0cb9bf21.chunk.js.map

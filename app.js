PS = {};
PS.Phone = {};
PS.Screen = {};
PS.Phone.Functions = {};
PS.Phone.Animations = {};
PS.Phone.Notifications = {};
PS.Phone.Languages = {};
PS.Phone.ContactColors = {
  0x0: '#9b59b6',
  0x1: "#3498db",
  0x2: "#e67e22",
  0x3: '#e74c3c',
  0x4: '#1abc9c',
  0x5: '#9c88ff'
};
PS.Phone.Data = {
  'currentApplication': null,
  'UserData': {},
  'Applications': {},
  'IsOpen': false,
  'CallActive': false,
  'MetaData': {},
  'AnonymousCall': false,
  'NoturnMode': false,
  'SendLocation': false,
  'InstagramAccount': null,
  'WhatsAppAccount': null,
  'TwitterAccount': null,
  'DarkwebAccount': null,
  'TinderAccount': null
};
OpenedChatData = {
  'name': null,
  'phone': null,
  'group': null,
  'layer': null,
  'messages': null,
  'messagesdata': null
};
var iphost = 'http://127.0.0.1/';
PS.Phone.Audio = null;
var CanOpenApp = true;
var IsTyping = false;
var IsPainelOpen = false;
PS.Phone.Functions.SetupAppWarnings = function (_0x52f71f) {
  $.each(_0x52f71f, function (_0x8ac054, _0x347dbd) {
    var _0x4ac548 = $(".phone-applications").find("[data-appslot='" + _0x347dbd.slot + "']").find(".app-unread-alerts");
    if (_0x347dbd.Alerts > 0x0) {
      $(_0x4ac548).html(_0x347dbd.Alerts);
      $(_0x4ac548).css({
        'display': "block"
      });
    } else {
      $(_0x4ac548).css({
        'display': "none"
      });
    }
  });
};
PS.Phone.Functions.IsAppHeaderAllowed = function (_0x3b1914) {
  var _0x450f39 = true;
  $.each(Config.HeaderDisabledApps, function (_0x273421, _0x1fabf1) {
    if (_0x3b1914 == _0x1fabf1) {
      _0x450f39 = false;
    }
  });
  return _0x450f39;
};
$(document).on("click", ".phone-application", function (_0x39f58b) {
  _0x39f58b.preventDefault();
  var _0x5e663c = $(this).data("app");
  var _0x65b60a = $('.' + _0x5e663c + "-app");
  if (_0x65b60a.length !== 0x0) {
    if (CanOpenApp) {
      if (PS.Phone.Data.currentApplication == null) {
        PS.Phone.Animations.TopSlideDown(".phone-application-container", 0x12c, 0x0);
        PS.Phone.Functions.ToggleApp(_0x5e663c, 'block');
        if (PS.Phone.Functions.IsAppHeaderAllowed(_0x5e663c)) {
          PS.Phone.Functions.HeaderTextColor("black", 0x12c);
        }
        PS.Phone.Data.currentApplication = _0x5e663c;
        if (_0x5e663c != "bank" && _0x5e663c != "spotify" && _0x5e663c != 'twitter') {
          $(".phone-navigation .navigation-center").addClass("black");
        } else {
          PS.Phone.Functions.HeaderTextColor("white", 0x12c);
          $(".phone-navigation .navigation-center").removeClass("black");
        }
        if (_0x5e663c == "settings") {
          $("#myPhoneNumber").text(PS.Phone.Data.UserData.identity.phone);
        } else {
          if (_0x5e663c == "twitter") {
            $.post("http://" + GetParentResourceName() + "/GetUserProfileTwitter", JSON.stringify({}), function (_0x3ec3d6) {
              PS.Phone.Functions.ReceiveAccountTwitter(_0x3ec3d6);
            });
          } else {
            if (_0x5e663c == "bank") {
              $.post("http://" + GetParentResourceName() + "/RefreshUserData", JSON.stringify({}));
              PS.Phone.Functions.DoBankOpen();
            } else {
              if (_0x5e663c == "whatsapp") {
                $.post("http://" + GetParentResourceName() + "/GetUserProfileWhatsApp", JSON.stringify({}), function (_0x58335) {
                  PS.Phone.Functions.ReceiveAccountWhatsApp(_0x58335);
                });
              } else {
                if (_0x5e663c == "phone") {
                  $.post('http://' + GetParentResourceName() + "/GetMissedCalls", JSON.stringify({}), function (_0x39c8f2) {
                    PS.Phone.Functions.SetupRecentCalls(_0x39c8f2);
                  });
                  $.post("http://" + GetParentResourceName() + "/GetContacts", JSON.stringify({}));
                } else {
                  if (_0x5e663c == "instagram") {
                    $.post("http://" + GetParentResourceName() + '/GetUserProfileInsta', JSON.stringify({}), function (_0x2751f1) {
                      PS.Phone.Functions.ReceiveAccount(_0x2751f1);
                    });
                  } else {
                    if (_0x5e663c == 'messages') {
                      $.post("http://" + GetParentResourceName() + '/GetMessages', JSON.stringify({}), function (_0x2ca3a4) {
                        PS.Phone.Functions.LoadMessages(_0x2ca3a4);
                      });
                    } else {
                      if (_0x5e663c == 'help') {
                        $.post("http://" + GetParentResourceName() + "/GetHelpList", JSON.stringify({}), function (_0x15961a) {
                          PS.Phone.Functions.LoadHelpList(_0x15961a);
                        });
                      } else {
                        if (_0x5e663c == "spotify") {
                          $.post("http://" + GetParentResourceName() + "/GetClientID", JSON.stringify({}), function (_0x36ca67) {
                            SC.initialize({
                              'client_id': _0x36ca67,
                              'redirect_uri': "http://" + GetParentResourceName() + '/'
                            });
                          });
                        } else {
                          if (_0x5e663c == 'darkweb') {
                            $.post("http://" + GetParentResourceName() + "/GetUserProfileDarkweb", JSON.stringify({}), function (_0x11dc65) {
                              PS.Phone.Functions.ReceiveAccountDarkweb(_0x11dc65);
                            });
                            PS.Phone.Functions.LoadTextDarkweb();
                          } else {
                            if (_0x5e663c == "tinder") {
                              $.post("http://" + GetParentResourceName() + "/GetUserProfileTinder", JSON.stringify({}), function (_0x5a5753) {
                                PS.Phone.Functions.ReceiveAccountTinder(_0x5a5753);
                              });
                            } else {
                              if (_0x5e663c == "news") {
                                $.post('http://' + GetParentResourceName() + "/GetAdvertNews", JSON.stringify({}), function (_0x3e7eec) {
                                  PS.Phone.Functions.LoadAdvertNews(_0x3e7eec);
                                });
                                $.post('http://' + GetParentResourceName() + "/GetPostsNews", JSON.stringify({}), function (_0x30074b) {
                                  PS.Phone.Functions.LoadPostsNews(_0x30074b);
                                });
                              } else {
                                if (_0x5e663c == "olx") {
                                  $.post("http://" + GetParentResourceName() + '/GetPostsOlx', JSON.stringify({}), function (_0x1d6938) {
                                    PS.Phone.Functions.LoadPostsOlx(_0x1d6938);
                                  });
                                } else {
                                  if (_0x5e663c == "camera") {
                                    $.post('https://' + GetParentResourceName() + "/PostNewImage", JSON.stringify({}), function (_0x58ba40) {
                                      setUpCameraApp(_0x58ba40);
                                    });
                                    PS.Phone.Functions.Close();
                                  } else if (_0x5e663c == 'gallery') {
                                    $.post("http://" + GetParentResourceName() + "/GetPostsGallery", JSON.stringify({}), function (_0x2d4388) {
                                      PS.Phone.Functions.LoadPostsGallery(_0x2d4388);
                                    });
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } else {}
});
$(document).on('click', ".navigation-center", function (_0x153e8c) {
  _0x153e8c.preventDefault();
  $(this).removeClass("black");
  if (PS.Phone.Data.currentApplication === null) {
    PS.Phone.Functions.Close();
  } else {
    PS.Phone.Animations.TopSlideUp(".phone-application-container", 0x190, -0xa0);
    PS.Phone.Animations.TopSlideUp('.' + PS.Phone.Data.currentApplication + "-app", 0x190, -0xa0);
    CanOpenApp = false;
    setTimeout(function () {
      PS.Phone.Functions.ToggleApp(PS.Phone.Data.currentApplication, "none");
      CanOpenApp = true;
    }, 0x190);
    PS.Phone.Functions.HeaderTextColor("white", 0x12c);
    if (PS.Phone.Data.currentApplication == "whatsapp") {
      if (OpenedChatData.phone !== null) {
        setTimeout(function () {
          $(".whatsapp-chats").css({
            'display': "block"
          });
          $(".whatsapp-chats").animate({
            'left': "0vh"
          }, 0x1);
          $('.whatsapp-openedchat').animate({
            'left': "-30vh"
          }, 0x1, function () {
            $(".whatsapp-openedchat").css({
              'display': "none"
            });
          });
          OpenedChatPicture = null;
          OpenedChatData.phone = null;
        }, 0x1c2);
      }
    } else if (PS.Phone.Data.currentApplication == 'meos') {
      $(".meos-alert-new").remove();
      setTimeout(function () {
        $('.meos-recent-alert').removeClass("noodknop");
        $(".meos-recent-alert").css({
          'background-color': "#004682"
        });
      }, 0x190);
    }
    PS.Phone.Data.currentApplication = null;
  }
});
PS.Phone.Functions.Open = function (_0xdef3fa) {
  if (_0xdef3fa.checklicense) {
    PS.Phone.Animations.BottomSlideUp(".container", 0x12c, 0x0);
    PS.Phone.Data.IsOpen = true;
  }
};
PS.Phone.Functions.OpenPainel = function (_0x170161) {
  if (_0x170161.checklicense) {
    if (!PS.Phone.Data.IsOpen) {
      IsPainelOpen = true;
      $(".container_painel").show();
    }
  }
};
PS.Phone.Functions.ToggleApp = function (_0x4b23aa, _0x793757) {
  $('.' + _0x4b23aa + "-app").css({
    'display': _0x793757
  });
};
PS.Phone.Functions.Close = function () {
  PS.Phone.Animations.BottomSlideDown(".container", 0x12c, -0x55);
  $.post('http://' + GetParentResourceName() + "/Close");
  PS.Phone.Data.IsOpen = false;
};
PS.Phone.Functions.ClosePainel = function () {
  IsPainelOpen = false;
  $('.container_painel').hide();
  $.post("http://" + GetParentResourceName() + "/ClosePainel");
};
PS.Phone.Functions.HeaderTextColor = function (_0x7979d4, _0x18829c) {
  $(".phone-header").animate({
    'color': _0x7979d4
  }, _0x18829c);
};
PS.Phone.Animations.BottomSlideUp = function (_0x290591, _0x4aa756, _0x507798) {
  $(_0x290591).css({
    'display': "block"
  }).animate({
    'bottom': _0x507798 + '%'
  }, _0x4aa756);
};
PS.Phone.Animations.BottomSlideDown = function (_0x42d208, _0x58010d, _0x2b0f0b) {
  $(_0x42d208).css({
    'display': "block"
  }).animate({
    'bottom': _0x2b0f0b + '%'
  }, _0x58010d, function () {
    $(_0x42d208).css({
      'display': "none"
    });
  });
};
PS.Phone.Animations.TopSlideDown = function (_0x5f4b39, _0x137eec, _0x25c7f2) {
  $(_0x5f4b39).css({
    'display': "block"
  }).animate({
    'top': _0x25c7f2 + '%'
  }, _0x137eec);
};
PS.Phone.Animations.TopSlideUp = function (_0x1374ce, _0x3a555e, _0x4a69ce, _0x32d4d0) {
  $(_0x1374ce).css({
    'display': "block"
  }).animate({
    'top': _0x4a69ce + '%'
  }, _0x3a555e, function () {
    $(_0x1374ce).css({
      'display': 'none'
    });
  });
};
PS.Phone.Notifications.Add = function (_0x275ccd, _0x326057, _0x58bdca, _0x9f3ee6, _0x2db032) {
  $.post('http://' + GetParentResourceName() + "/HasPhone", JSON.stringify({}), function (_0x4a9074) {
    if (_0x4a9074) {
      if (_0x2db032 == null && _0x2db032 == undefined) {
        _0x2db032 = 0x5dc;
      }
      if (PS.Phone.Notifications.Timeout == undefined || PS.Phone.Notifications.Timeout == null) {
        if (_0x9f3ee6 != null || _0x9f3ee6 != undefined) {
          $('.notification-icon').css({
            'color': _0x9f3ee6
          });
          $(".notification-title").css({
            'color': _0x9f3ee6
          });
        } else if (_0x9f3ee6 == "default" || _0x9f3ee6 == null || _0x9f3ee6 == undefined) {
          $('.notification-icon').css({
            'color': "#e74c3c"
          });
          $(".notification-title").css({
            'color': "#e74c3c"
          });
        }
        PS.Phone.Animations.TopSlideDown('.phone-notification-container', 0xc8, 0x8);
        if (_0x275ccd !== "politie") {
          $('.notification-icon').html("<i class=\"" + _0x275ccd + "\"></i>");
        } else {
          $('.notification-icon').html("<img src=\"./img/politie.png\" class=\"police-icon-notify\">");
        }
        $(".notification-title").html(_0x326057);
        $(".notification-text").html(_0x58bdca);
        if (PS.Phone.Notifications.Timeout !== undefined || PS.Phone.Notifications.Timeout !== null) {
          clearTimeout(PS.Phone.Notifications.Timeout);
        }
        PS.Phone.Notifications.Timeout = setTimeout(function () {
          PS.Phone.Animations.TopSlideUp(".phone-notification-container", 0xc8, -0x8);
          PS.Phone.Notifications.Timeout = null;
        }, _0x2db032);
      } else {
        if (_0x9f3ee6 != null || _0x9f3ee6 != undefined) {
          $(".notification-icon").css({
            'color': _0x9f3ee6
          });
          $(".notification-title").css({
            'color': _0x9f3ee6
          });
        } else {
          $(".notification-icon").css({
            'color': "#e74c3c"
          });
          $(".notification-title").css({
            'color': '#e74c3c'
          });
        }
        $('.notification-icon').html("<i class=\"" + _0x275ccd + "\"></i>");
        $('.notification-title').html(_0x326057);
        $('.notification-text').html(_0x58bdca);
        if (PS.Phone.Notifications.Timeout !== undefined || PS.Phone.Notifications.Timeout !== null) {
          clearTimeout(PS.Phone.Notifications.Timeout);
        }
        PS.Phone.Notifications.Timeout = setTimeout(function () {
          PS.Phone.Animations.TopSlideUp(".phone-notification-container", 0xc8, -0x8);
          PS.Phone.Notifications.Timeout = null;
        }, _0x2db032);
      }
    }
  });
};
PS.Phone.Functions.LoadPhoneData = function (_0x51979c) {
  PS.Phone.Data.UserData = _0x51979c.UserData;
  PS.Phone.Functions.LoadBackground(_0x51979c.PhoneData.background);
  PS.Phone.Functions.LoadZoom(_0x51979c.PhoneData.Zoom);
  PS.Phone.Functions.AnonymousCall(_0x51979c.PhoneData.AnonymousCall);
  if (PS.Phone.Functions.LoadContacts() != undefined) {
    PS.Phone.Functions.LoadContacts(_0x51979c.PhoneData.Contacts);
  }
};
PS.Phone.Functions.UpdateTime = function (_0x1aabcc) {
  var _0x1089a3 = new Date();
  var _0x1c45f3 = _0x1089a3.getHours();
  var _0x247327 = _0x1089a3.getMinutes();
  var _0x5e301d = _0x247327;
  var _0x6ccc48 = _0x1c45f3;
  if (_0x1c45f3 < 0xa) {
    _0x6ccc48 = '0' + _0x6ccc48;
  }
  if (_0x247327 < 0xa) {
    _0x5e301d = '0' + _0x247327;
  }
};
var NotificationTimeout = null;
PS.Screen.Notification = function (_0x2d0720, _0x185266, _0x41e052, _0x277156, _0xba0df4) {
  $.post("http://" + GetParentResourceName() + "/HasPhone", JSON.stringify({}), function (_0x2a7fe2) {
    if (_0x2a7fe2) {
      PS.Phone.Audio = new Audio('/html/sound/tchatNotification.ogg');
      PS.Phone.Audio.volume = 0x1;
      PS.Phone.Audio.play();
      if (_0x185266.includes("http://")) {
        _0x185266 = "Link / Imagem";
      }
      if (_0x185266.includes('https://')) {
        _0x185266 = "Link / Imagem";
      }
      $(".screen-notification-icon").html("<img src=\"img/icons/" + _0x41e052 + ".png\">");
      $(".screen-notification-title").text(_0x2d0720);
      $(".screen-notification-content").text(_0x185266);
      $(".screen-notifications-container").css({
        'display': "block"
      }).animate({
        'right': "5vh"
      }, 0xc8);
      if (NotificationTimeout != null) {
        clearTimeout(NotificationTimeout);
      }
      NotificationTimeout = setTimeout(function () {
        $(".screen-notifications-container").animate({
          'right': "-35vh"
        }, 0xc8, function () {
          $(".screen-notifications-container").css({
            'display': "none"
          });
        });
        NotificationTimeout = null;
      }, _0x277156);
    }
  });
};
PS.Phone.Functions.isUserNameValid = function (_0x23be61) {
  const _0x5c811d = /^[a-z0-9_\.]+$/.exec(_0x23be61);
  const _0x231430 = !!_0x5c811d;
  return _0x231430;
};
PS.Phone.Functions.convertDateMySql = function (_0x5093c9) {
  var _0x483686 = new Date(_0x5093c9);
  var _0x15f7d7 = _0x483686.getDate();
  var _0x164502 = _0x483686.getMonth() + 0x1;
  if (_0x15f7d7 < 0xa) {
    _0x15f7d7 = '0' + _0x15f7d7;
  }
  if (_0x164502 < 0xa) {
    _0x164502 = '0' + _0x164502;
  }
  return _0x483686.getFullYear() + '-' + _0x164502 + '-' + _0x15f7d7;
};
PS.Phone.Functions.convertDate = function (_0x1af460) {
  var _0x40541c = new Date(_0x1af460);
  var _0x1244b8 = _0x40541c.getDate();
  var _0x3e0d8d = _0x40541c.getMonth() + 0x1;
  if (_0x1244b8 < 0xa) {
    _0x1244b8 = '0' + _0x1244b8;
  }
  if (_0x3e0d8d < 0xa) {
    _0x3e0d8d = '0' + _0x3e0d8d;
  }
  return _0x1244b8 + '/' + _0x3e0d8d + '/' + _0x40541c.getFullYear();
};
PS.Phone.Functions.convertDateFull = function (_0x1c5616) {
  var _0x4ffcb9 = new Date(_0x1c5616);
  var _0x7a6160 = _0x4ffcb9.getDate();
  var _0x5a6524 = _0x4ffcb9.getMonth() + 0x1;
  var _0x2ad470 = _0x4ffcb9.getHours();
  var _0x2aa61f = _0x4ffcb9.getMinutes();
  var _0x49247d = _0x4ffcb9.getFullYear();
  if (_0x7a6160 < 0xa) {
    _0x7a6160 = '0' + _0x7a6160;
  }
  if (_0x5a6524 < 0xa) {
    _0x5a6524 = '0' + _0x5a6524;
  }
  if (_0x2ad470 < 0xa) {
    _0x2ad470 = '0' + _0x2ad470;
  }
  if (_0x2aa61f < 0xa) {
    _0x2aa61f = '0' + _0x2aa61f;
  }
  var _0x2087f7 = _0x7a6160 + '/' + _0x5a6524 + '/' + _0x49247d + " às " + _0x2ad470 + ':' + _0x2aa61f;
  return _0x2087f7;
};
PS.Phone.Functions.sort_by = (_0x198508, _0x3c2d54, _0x2db184) => {
  const _0x168bf2 = _0x2db184 ? function (_0x4ded03) {
    return _0x2db184(_0x4ded03[_0x198508]);
  } : function (_0xad3ee3) {
    return _0xad3ee3[_0x198508];
  };
  _0x3c2d54 = !_0x3c2d54 ? 0x1 : -0x1;
  return function (_0x1612b2, _0x54503c) {
    _0x1612b2 = _0x168bf2(_0x1612b2);
    _0x54503c = _0x168bf2(_0x54503c);
    return _0x3c2d54 * ((_0x1612b2 > _0x54503c) - (_0x54503c > _0x1612b2));
  };
};
PS.Phone.Functions.FormatString = function (_0x9aac44) {
  if (_0x9aac44 != undefined) {
    var _0x19d8e3 = Array.prototype.slice.call(arguments, 0x1);
    return _0x9aac44.replace(/\{(\d+)\}/g, function (_0x345326, _0x2041f6) {
      return _0x19d8e3[_0x2041f6];
    });
  } else {
    return _0x9aac44;
  }
};
$(document).ready(function () {
  moment.locale("pt-br");
  var _0x5e9f92 = document.querySelector("#phone-time");
  _0x5e9f92.innerHTML = moment().format('LT');
  setInterval(function () {
    _0x5e9f92.innerHTML = moment().format('LT');
  }, 0x3e8);
  var _0x3f7e4a = document.querySelector("#phone-time-hour");
  if (GetParentResourceName() == "evo_phone") {
    var _0x144759 = document.querySelector('#phone-time-minute');
  }
  var _0x4c5ce1 = document.querySelector("#phone-time-weeked");
  if (GetParentResourceName() == "evo_phone") {
    _0x3f7e4a.innerHTML = moment().format('LT');
  } else if (GetParentResourceName() == "evo_phone") {
    _0x3f7e4a.innerHTML = moment().hour() < 0xa ? '0' + moment().hour() : moment().hour();
    _0x144759.innerHTML = moment().format('mm');
  }
  _0x4c5ce1.innerHTML = moment().format('LL');
  setInterval(function () {
    if (GetParentResourceName() == "evo_phone") {
      _0x3f7e4a.innerHTML = moment().format('LT');
    } else if (GetParentResourceName() == 'evo_phone') {
      _0x3f7e4a.innerHTML = moment().hour() < 0xa ? '0' + moment().hour() : moment().hour();
      _0x144759.innerHTML = moment().format('mm');
    }
    _0x4c5ce1.innerHTML = moment().format('LL');
  }, 0x3e8);
  window.addEventListener("message", function (_0x233be3) {
    switch (_0x233be3.data.action) {
      case "open":
        PS.Phone.Functions.Open(_0x233be3.data);
        PS.Phone.Functions.SetupAppWarnings(_0x233be3.data.AppData);
        PS.Phone.Functions.SetupCurrentCall(_0x233be3.data.CallData);
        PS.Phone.Data.IsOpen = true;
        PS.Phone.Data.UserData = _0x233be3.data.UserData;
        break;
      case "openpainel":
        PS.Phone.Functions.OpenPainel(_0x233be3.data);
        break;
      case "close":
        PS.Phone.Functions.Close();
        break;
      case "LoadPhoneData":
        PS.Phone.Functions.LoadPhoneData(_0x233be3.data);
        break;
      case "UpdateTime":
        PS.Phone.Functions.UpdateTime(_0x233be3.data);
        break;
      case "Notification":
        PS.Screen.Notification(_0x233be3.data.NotifyData.title, _0x233be3.data.NotifyData.content, _0x233be3.data.NotifyData.icon, _0x233be3.data.NotifyData.timeout, _0x233be3.data.NotifyData.color);
        break;
      case 'PhoneNotification':
        PS.Phone.Notifications.Add(_0x233be3.data.PhoneNotify.icon, _0x233be3.data.PhoneNotify.title, _0x233be3.data.PhoneNotify.text, _0x233be3.data.PhoneNotify.color, _0x233be3.data.PhoneNotify.timeout);
        break;
      case "RefreshAppAlerts":
        PS.Phone.Functions.SetupAppWarnings(_0x233be3.data.AppData);
        break;
      case "UpdateMentionedTweets":
        PS.Phone.Notifications.LoadMentionedTweets(_0x233be3.data.Tweets);
        break;
      case "UpdateBank":
        $(".bank-app-account-balance").html("&#36; " + _0x233be3.data.NewBalance);
        $(".bank-app-account-balance").data("balance", _0x233be3.data.NewBalance);
        break;
      case "UpdateChat":
        if (PS.Phone.Data.currentApplication == "whatsapp") {
          if (OpenedChatData.phone !== null && OpenedChatData.phone == _0x233be3.data.chatNumber) {
            PS.Phone.Functions.SetupChatMessages(_0x233be3.data.chatData);
          } else {
            PS.Phone.Functions.LoadWhatsappChats(_0x233be3.data.Chats);
          }
        }
        break;
      case 'RefreshChatWhatsApp':
        PS.Phone.Functions.RefreshChatWhatsApp();
        break;
      case 'RefreshGroupWhatsApp':
        PS.Phone.Functions.RefreshGroupWhatsApp();
        break;
      case "RefreshPostsInstagram":
        PS.Phone.Functions.RefreshPostsInstagram();
        break;
      case "RefreshStoriesInstagram":
        PS.Phone.Functions.RefreshStoriesInstagram();
        break;
      case "RefreshChatInstagram":
        PS.Phone.Functions.RefreshChatInstagram();
        break;
      case "UpdateHashtags":
        PS.Phone.Notifications.LoadHashtags(_0x233be3.data.Hashtags);
        break;
      case "RefreshWhatsappAlerts":
        PS.Phone.Functions.ReloadWhatsappAlerts(_0x233be3.data.Chats);
        break;
      case "RefreshLayerDarkweb":
        PS.Phone.Functions.RefreshLayerDarkweb();
        break;
      case "RefreshChatTinder":
        PS.Phone.Functions.RefreshChatTinder();
        break;
      case "CancelOutgoingCall":
        if (PS.Phone.Audio) {
          PS.Phone.Audio.pause();
        }
        $.post("http://" + GetParentResourceName() + "/HasPhone", JSON.stringify({}), function (_0x45f59d) {
          if (_0x45f59d) {
            CancelOutgoingCall();
          }
        });
        break;
      case 'IncomingCallAlert':
        $.post('http://' + GetParentResourceName() + "/HasPhone", JSON.stringify({}), function (_0xc2fd1b) {
          if (_0xc2fd1b) {
            IncomingCallAlert(_0x233be3.data.CallData, _0x233be3.data.Canceled, _0x233be3.data.AnonymousCall);
          }
        });
        if (PS.Phone.Audio) {
          PS.Phone.Audio.pause();
        }
        break;
      case "SetupHomeCall":
        if (_0x233be3.data.CallData.CallType) {
          PS.Phone.Audio = new Audio("/html/sound/ring.ogg");
          PS.Phone.Audio.volume = 0x1;
          PS.Phone.Audio.loop = true;
          PS.Phone.Audio.play();
        }
        PS.Phone.Functions.SetupCurrentCall(_0x233be3.data.CallData, _0x233be3.data.AnonymousCall);
        break;
      case "CancelCallPhoneCLose":
        if (PS.Phone.Audio) {
          PS.Phone.Audio.pause();
        }
        break;
      case "AnswerCall":
        PS.Phone.Functions.AnswerCall(_0x233be3.data.CallData, _0x233be3.data.AnonymousCall);
        break;
      case "UpdateCallTime":
        var _0x3d6d4b = _0x233be3.data.Time;
        var _0x58fec4 = new Date(null);
        _0x58fec4.setSeconds(_0x3d6d4b);
        var _0x1d248f = _0x58fec4.toISOString().substr(0xb, 0x8);
        if (PS.Phone.Audio) {
          PS.Phone.Audio.pause();
        }
        if (!PS.Phone.Data.IsOpen) {
          if ($(".call-notifications").css("right") !== "52.1px") {
            $('.call-notifications').css({
              'display': "block"
            });
            $(".call-notifications").animate({
              'right': "5vh"
            });
          }
          var _0x59395d = PS.Phone.Languages.on_call;
          _0x59395d = PS.Phone.Functions.FormatString(_0x59395d, _0x1d248f);
          var _0x4c03e1 = PS.Phone.Languages.on_the_phone;
          _0x4c03e1 = PS.Phone.Functions.FormatString(_0x4c03e1, _0x233be3.data.Name);
          $(".call-notifications-title").html(_0x59395d);
          $(".call-notifications-content").html(_0x4c03e1);
          $(".call-notifications").removeClass("call-notifications-shake");
        } else {
          $(".call-notifications").animate({
            'right': "-35vh"
          }, 0x190, function () {
            $(".call-notifications").css({
              'display': "none"
            });
          });
        }
        var _0x59395d = PS.Phone.Languages.on_call;
        _0x59395d = PS.Phone.Functions.FormatString(_0x59395d, _0x1d248f);
        $(".phone-call-ongoing-caller").html(_0x233be3.data.Name);
        $(".phone-call-ongoing-time").html(_0x1d248f);
        $(".phone-currentcall-title").html(_0x59395d);
        break;
      case "CancelOngoingCall":
        if (PS.Phone.Audio) {
          PS.Phone.Audio.pause();
        }
        $(".call-notifications").animate({
          'right': "-35vh"
        }, function () {
          $(".call-notifications").css({
            'display': "none"
          });
        });
        PS.Phone.Animations.TopSlideUp(".phone-application-container", 0x190, -0xa0);
        setTimeout(function () {
          PS.Phone.Functions.ToggleApp("phone-call", "none");
          $('.phone-application-container').css({
            'display': "none"
          });
        }, 0x190);
        PS.Phone.Functions.HeaderTextColor("white", 0x12c);
        PS.Phone.Data.CallActive = false;
        PS.Phone.Data.currentApplication = null;
        break;
      case "RefreshContacts":
        PS.Phone.Functions.LoadContacts(_0x233be3.data.Contacts);
        break;
      case 'RefreshStoriesInsta':
        PS.Phone.Functions.ReceiveStories(_0x233be3.data.stories);
        break;
      case "RefreshMyStorieInsta":
        PS.Phone.Functions.ReceiveMyStorie(_0x233be3.data.storie);
        break;
      case "RefreshPostsInsta":
        PS.Phone.Functions.ReceivePosts(_0x233be3.data.posts);
        break;
      case "RefreshStoriesWhatsApp":
        PS.Phone.Functions.ReceiveStoriesWhatsApp(_0x233be3.data.stories);
        break;
      case "ReceiveMyStorieWhatsApp":
        PS.Phone.Functions.ReceiveMyStorieWhatsApp(_0x233be3.data.storie);
        break;
      case "RefreshPostsOlx":
        PS.Phone.Functions.LoadPostsOlx(_0x233be3.data.posts);
        break;
      case "RefreshPostsNewsPainel":
        PS.Phone.Functions.LoadPostsNewsPainel(_0x233be3.data.posts);
        break;
      case "UpdateIPAddress":
        iphost = _0x233be3.data.ipaddress;
        break;
      case "UpdateConfig":
        Config.Client = JSON.parse(_0x233be3.data.configfile);
        Config.LoadMasks();
        Config.DisabledApps();
        break;
      case 'UpdateLanguages':
        PS.Phone.Languages = JSON.parse(_0x233be3.data.languages);
        break;
    }
  });
});
$(document).on("keydown", function () {
  switch (event.keyCode) {
    case 0x8:
      if (!IsTyping && !IsPainelOpen) {
        PS.Phone.Functions.Close();
      }
      break;
    case 0x1b:
      PS.Phone.Functions.ClosePainel();
      break;
  }
});
$(document).on("blur", "input", function (_0x12b3d9) {
  IsTyping = false;
  $.post("http://" + GetParentResourceName() + "/ChangeIsTyping", JSON.stringify({
    'status': false
  }), function (_0x589373) {});
});
$(document).on("focus", "input", function (_0x2f55ca) {
  IsTyping = true;
  $.post("http://" + GetParentResourceName() + '/ChangeIsTyping', JSON.stringify({
    'status': true
  }), function (_0x438da9) {});
});
$(document).on('blur', "textarea", function (_0x565070) {
  IsTyping = false;
  $.post("http://" + GetParentResourceName() + "/ChangeIsTyping", JSON.stringify({
    'status': false
  }), function (_0x1aa21c) {});
});
$(document).on('focus', "textarea", function (_0x7df9d4) {
  IsTyping = true;
  $.post('http://' + GetParentResourceName() + "/ChangeIsTyping", JSON.stringify({
    'status': true
  }), function (_0x1ec9b0) {});
});
var openmodal = [".insta-posts img", ".ImgTab img", ".whatsapp-openedchat-messages img", ".darkweb-app .chat-flow img", ".messages-openedchat img", ".direct-openedchat-messages img", ".olx-app .olxpost .imagempost img"];
for (let i = 0x0; i < openmodal.length; i++) {
  const element = openmodal[i];
  $(document).on("click", element, function (_0x6bc3a3) {
    _0x6bc3a3.preventDefault();
    if (!$(this).hasClass("no-open")) {
      var _0xa13129 = $(this).attr("src");
      $('#ModalImg').show();
      $("#image-receive-modal").attr("src", _0xa13129);
    }
  });
}
$(document).on("click", ".modal-img .close", function (_0x59daf7) {
  _0x59daf7.preventDefault();
  $("#ModalImg").hide();
});
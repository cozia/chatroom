'use strict';

/**
 * @ngdoc overview
 * @name chartroomApp
 * @description
 * # chartroomApp
 *
 * Main module of the application.
 */
angular.module('chartroomApp',['ngMaterial'])
  .service("message",function($http,$q){
    this.msg_group=[1,2,3];
    var api="http://115.28.36.199/wechat-robot-web/appchatrobot/chat";
    this.post=function(obj){
      var deferred=$q.defer();
      $http.post(api,obj).success(function(data){
        deferred.resolved(data);
      }).error(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }
  })
  .controller("chartroomCtrl",["$scope","message",function($scope,message){
        $scope.my_msg='';
        $scope.info={
          userid : "潇洒",
          infotype : "chat",
          params : [{"name":"info","value":"你好"}]
        }
  }])
  .directive("sendMsg",function(message){
    return{
      restrict:"AE",
      scope:false,
      link:function(sco,ele,attr){
        ele.bind("click",function(){
          if(sco.my_msg!=''){
            message.msg_group.push(sco.my_msg);
            var promisa=message.post(sco.info);
            promisa.then(function(data){
              //message.msg_group.push(data.content);
              console.log(data);
            },function(error){
              throw new Error(error);
            });
            sco.my_msg="";
          }else{
            throw new Error("消息内容不能为空");
          }
        })

      }
    }
  });


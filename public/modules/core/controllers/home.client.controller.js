'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        $scope.lightStatus1 = true;
        $scope.lightStatus2 = true;
        $scope.panelRoom1 = true;
        $scope.panelRoom2 = false;
        $scope.panelRoom3 = false;
        $scope.panelLvRoom = false;
        $scope.panelKitchen = false;

        $scope.tabs = [
            { paneId: 'tab01', title: 'Room 1', content: 'Tab Number 1 Content', active: true, disabled: false },
            { paneId: 'tab02', title: 'Room 2', content: 'Tab Number 2 Content', active: false, disabled: false },
            { paneId: 'tab03', title: 'Room 3', content: 'Tab Number 3 Content', active: false, disabled: false },
            { paneId: 'tab04', title: 'Living Room', content: 'Tab Number 4 Content', active: false, disabled: false },
            { paneId: 'tab05', title: 'Kitchen', content: 'Tab Number 5 Content', active: false, disabled: false }
        ];

        var setPanelFlags = function(room1,room2,room3,lvroom,kitchen){
            $scope.panelRoom1 = room1;
            $scope.panelRoom2 = room2;
            $scope.panelRoom3 = room3;
            $scope.panelLvRoom = lvroom;
            $scope.panelKitchen = kitchen;
        };

        $scope.panelView = function(panel){
          console.log(panel);
            if(panel=='Room 1'){
                console.log('1');
                setPanelFlags(true,false,false,false,false);
            }else if(panel=='Room 2'){
                console.log('2');
                setPanelFlags(false,true,false,false,false);
            }else if(panel =='Room 3'){
                console.log('3');
                setPanelFlags(false,false,true,false,false);
            }else if(panel == 'Living Room'){
                console.log('4');
                setPanelFlags(false,false,false,true,false);
            }else{
                console.log('5');
                setPanelFlags(false,false,false,false,true);
            }
        };

        $scope.changeDetect2 = function(id){
            console.log('Change Detected');
            //console.log('id: '+id);
            if (id){
                console.log('On');
            }else{
                console.log('Off');
            }
        };

        $scope.swipe = function($event) {
            console.log($event);
        };

        $scope.lightOnCount = 0;
        $scope.lightOffCount = 0;

        var socket = io.connect('http://186.121.229.227:80');
//        var socket = io.connect('http://192.168.0.102');

        socket.on('connect', function() {
            $('#messages').html('Connected to the server.');
        });

        socket.on('message', function(message) {
            $('#status').html(message);
        });

        socket.on('disconnect', function() {
            $('#messages').html('<li>Disconnected from the server.</li>');
            ('#status').html('disconnected');
        });

        var switchLightFlags = function(id,value){
            switch(id) {
                case 1:
                    $scope.lightStatus1 = value;
                    break;
                case 2:
                    $scope.lightStatus2 = value;
                    break;
                case 3:
                    $scope.lightStatus3 = value;
                    break;
                case 4:
                    $scope.lightStatus4 = value;
                    break;
                case 5:
                    $scope.lightStatus5 = value;
                    break;
                case 6:
                    $scope.lightStatus6 = value;
                    break;
            }
        };

        $scope.lightButton = function(status,option){
            var messageFlag = !status? 'turn on':'turn off';
            console.log(option);
            var message = messageFlag+' '+option;
            console.log('message: '+message);
            socket.send(message);
            console.log('messageFlag: '+messageFlag);
            if (messageFlag == 'turn on'){
                switchLightFlags(option,true);
                $scope.lightOnCount++;
            }
            else{
                switchLightFlags(option,false);
                $scope.lightOffCount++;
            }
            console.log('Works');
        }

	}
]);




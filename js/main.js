var map;
// 地図を入れるオブジェクトmapをグローバルに定義する。
var marker;
// マーカーを入れるオブジェクトmarkerをグローバルに定義する。
var geocoder;

function initMap(){
  geocoder = new google.maps.Geocoder();
	map = new google.maps.Map($('#mymap')[0], // マップを出力
	// map = new google.maps.Map(document.getElementById('mymap'),
	{
		center : {lat : 35.173646, lng : 136.923550}, // マップの中心の初期設定
		zoom : 15, // マップの拡大倍率の指定
    mapTypeId: google.maps.MapTypeId.SATELLITE // マップを航空写真に変更
	}
	);

  marker = new google.maps.Marker(
    {
      position: {lat : 35.173646, lng : 136.923550}, // マーカーの座標の初期設定
      map: map,
      // title: "", // マーカーの名前
      animation: google.maps.Animation.DROP,　// 上から落ちてくるようなアニメーションの追加
      icon: {
        url: "images/marker.png", // マーカーをオリジナルの画像に変更
        scaledSize: new google.maps.Size(50, 50), // マーカーの画像のサイズを指定
      },
      label: {
        // text: "", // テキストを表示できる(住所など)
      }
    }
  );
  marker.setPosition({lat:35.173646,lng:136.923550});
  marker.setMap(map);

  google.maps.event.addListener(map, 'click', function(e) { // クリックしたとき(Clickイベント)
    marker.setPosition(e.latLng); // クリックした場所の座標をpositionに設定。
    map.setCenter(e.latLng); // マップの中心をクリックした場所の座標に設定。
  })
}

function geo() {

	marker.setMap(null);

	var address = document.getElementById("address").value;
	if (geocoder) {
		geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				marker = new google.maps.Marker( // マーカーの出力
					{
						position: results[0].geometry.location, // マーカーの座標の初期設定
						map: map,
						// title: "", // マーカーの名前
						animation: google.maps.Animation.DROP,　// 上から落ちてくるようなアニメーションの追加
						icon: {
							url: "images/marker.png", // マーカーをオリジナルの画像に変更
							scaledSize: new google.maps.Size(50, 50), // マーカーの画像のサイズを指定
						},
						label: {
							// text: "", // テキストを表示できる(住所など)
						}
					}
					);
					marker.setMap(map);
			}
		});
	}
}

function reset() {

	marker.setMap(null);

	map.setCenter({lat: 35.173646,lng: 136.923550});
	marker = new google.maps.Marker( // マーカーの出力
    {
			position: {lat: 35.173646,lng: 136.923550}, // マーカーの座標の初期設定
			map: map,
			// title: "", // マーカーの名前
			animation: google.maps.Animation.DROP,　// 上から落ちてくるようなアニメーションの追加
			icon: {
				url: "images/marker.png", // マーカーをオリジナルの画像に変更
				scaledSize: new google.maps.Size(50, 50), // マーカーの画像のサイズを指定
			},
			label: {
				// text: "", // テキストを表示できる(住所など)
			}
		}
    );
		marker.setMap(map);
}

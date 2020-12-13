import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {View, StyleSheet, Dimensions} from 'react-native';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Header from '../containers/Header';
import Opacity from '../components/Opacity';
import VisitMap from './delivery/VisitMap';

import MapView, {Marker, Polyline} from 'react-native-maps';
import {white, black} from '../configs/colors';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 20.990721;
const LONGITUDE = 105.787064;
const LATITUDE_DELTA = 0.0252;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const dataPoliline = {
  "geocoded_waypoints": [
    {
      "geocoder_status": "OK",
      "place_id": "ChIJ-RCamZesNTERyF_SKbb6EAM",
      "types": [
        "street_address"
      ]
    },
    {
      "geocoder_status": "OK",
      "place_id": "ChIJqbAJWr6sNTERNmv-7TCuWmI",
      "types": [
        "establishment",
        "point_of_interest"
      ]
    }
  ],
  "routes": [
    {
      "bounds": {
        "northeast": {
          "lat": 20.9987646,
          "lng": 105.8103547
        },
        "southwest": {
          "lat": 20.9920571,
          "lng": 105.8029379
        }
      },
      "copyrights": "Map data ©2020",
      "legs": [
        {
          "distance": {
            "text": "1.4 km",
            "value": 1387
          },
          "duration": {
            "text": "5 mins",
            "value": 296
          },
          "end_address": "2 Khuất Duy Tiến, Thanh Xuân Trung, Thanh Xuân, Hà Nội, Vietnam",
          "end_location": {
            "lat": 20.9923397,
            "lng": 105.80308
          },
          "start_address": "18 Ngõ 63 Vũ Trọng Phụng, Thanh Xuân Trung, Thanh Xuân, Hà Nội, Vietnam",
          "start_location": {
            "lat": 20.9980261,
            "lng": 105.8078549
          },
          "steps": [
            {
              "distance": {
                "text": "0.1 km",
                "value": 135
              },
              "duration": {
                "text": "1 min",
                "value": 46
              },
              "end_location": {
                "lat": 20.9987646,
                "lng": 105.8087913
              },
              "html_instructions": "Head <b>north</b> on <b>Ngõ 57 Vũ Trọng Phụng</b> toward <b>Vũ Trọng Phụng</b><div style=\"font-size:0.9em\">Restricted usage road</div><div style=\"font-size:0.9em\">Pass by Công Ty Tnhh Ddn Vina (on the right)</div>",
              "polyline": {
                "points": "udd_CarxdSA@EBC?CAA?AAIOy@eBy@gA"
              },
              "start_location": {
                "lat": 20.9980261,
                "lng": 105.8078549
              },
              "travel_mode": "DRIVING"
            },
            {
              "distance": {
                "text": "0.3 km",
                "value": 292
              },
              "duration": {
                "text": "1 min",
                "value": 89
              },
              "end_location": {
                "lat": 20.9965819,
                "lng": 105.8103547
              },
              "html_instructions": "Turn <b>right</b> at Công Ty Cổ Phần đầu Tư Phát Triển Công Nghệ Sơn Việt - Ếc onto <b>Vũ Trọng Phụng</b><div style=\"font-size:0.9em\">Pass by Nam Long Law Firm, Ltd. (on the right)</div>",
              "maneuver": "turn-right",
              "polyline": {
                "points": "gid_C}wxdSf@]TMTMn@_@HEjAaA^Sd@[`Ak@pAy@"
              },
              "start_location": {
                "lat": 20.9987646,
                "lng": 105.8087913
              },
              "travel_mode": "DRIVING"
            },
            {
              "distance": {
                "text": "0.9 km",
                "value": 851
              },
              "duration": {
                "text": "2 mins",
                "value": 124
              },
              "end_location": {
                "lat": 20.9920857,
                "lng": 105.8037487
              },
              "html_instructions": "Turn <b>right</b> at Công Ty Tnhh Một Thành Viên Sản Xuất Giấy Minh Châu onto <b>Nguyễn Trãi</b>/<wbr/><b>QL6</b><div style=\"font-size:0.9em\">Pass by Trung Tam Tri Lieu Dong Y Vinh An Duong (on the right)</div>",
              "maneuver": "turn-right",
              "polyline": {
                "points": "s{c_CuaydSVb@BDx@vAV`@h@|@RZTb@|@~AbAbBDHV\\v@lArAtBx@nA?F?FBHDFHPP^~F`JNV?@NTR^"
              },
              "start_location": {
                "lat": 20.9965819,
                "lng": 105.8103547
              },
              "travel_mode": "DRIVING"
            },
            {
              "distance": {
                "text": "87 m",
                "value": 87
              },
              "duration": {
                "text": "1 min",
                "value": 12
              },
              "end_location": {
                "lat": 20.9922002,
                "lng": 105.8029379
              },
              "html_instructions": "Slight <b>right</b> at Bếp Nam ANh - chuyên thiết bị nhà bếp và phòng tắm",
              "maneuver": "turn-slight-right",
              "polyline": {
                "points": "q_c_CmxwdSBZ@^AVCRCHAHCJCHCHCD"
              },
              "start_location": {
                "lat": 20.9920857,
                "lng": 105.8037487
              },
              "travel_mode": "DRIVING"
            },
            {
              "distance": {
                "text": "22 m",
                "value": 22
              },
              "duration": {
                "text": "1 min",
                "value": 25
              },
              "end_location": {
                "lat": 20.9923397,
                "lng": 105.80308
              },
              "html_instructions": "Turn <b>right</b> at Phòng khám BlueStar-Ngôi Sao Xanh<div style=\"font-size:0.9em\">Destination will be on the left</div>",
              "maneuver": "turn-right",
              "polyline": {
                "points": "g`c_CkswdSKIGEEGAC"
              },
              "start_location": {
                "lat": 20.9922002,
                "lng": 105.8029379
              },
              "travel_mode": "DRIVING"
            }
          ],
          "traffic_speed_entry": [],
          "via_waypoint": []
        }
      ],
      "overview_polyline": {
        "points": "udd_CarxdSGDGAgAwBy@gAf@]j@[x@e@jAaA^SfBgApAy@Vb@|@|A`A~AjDbGhDjFx@nA?FBPNXP^~F`JNXb@t@Dz@Ej@Mh@GNSOGK"
      },
      "summary": "Nguyễn Trãi/QL6",
      "warnings": [],
      "waypoint_order": []
    }
  ],
  "status": "OK"
};

const convertCoordinate = (data = {}) => {
  const lat =
    data && data.lat
      ? typeof data.lat === 'string'
        ? parseFloat(data.lat)
        : typeof data.lat === 'number'
        ? data.lat
        : LATITUDE
      : LATITUDE;
  const lng =
    data && data.lng
      ? typeof data.lng === 'string'
        ? parseFloat(data.lng)
        : typeof data.lng === 'number'
        ? data.lng
        : LONGITUDE
      : LONGITUDE;
  return {
    lat,
    lng,
  };
};

const initCoordinate = {
  lat: LATITUDE,
  lng: LONGITUDE,
};

function DeliveryAddressScreen(props) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {navigation, route} = props;
  // const data = route?.params.data ?? null;
  // const coordinateFrom = convertCoordinate(data?.from?.coordinate ?? {});
  // const coordinateTo = convertCoordinate(data?.to?.coordinate ?? {});
  const data = dataPoliline?.routes?.[0]?.legs?.[0] ?? null;
  if (!data) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        />

        <Header
          leftComponent={
            <Icon
              name="chevron-left"
              size={30}
              color={black}
              onPress={() => navigation.goBack()}
              isRotateRTL
            />
          }
          centerComponent={
            <Text h3 medium h3Style={styles.text}>
              {t('common:text_delivery_address')}
            </Text>
          }
          containerStyle={styles.header}
        />
      </View>
    );
  }
  const {
    distance,
    duration,
    start_location,
    end_location,
    start_address,
    end_address,
    steps,
  } = data;
  const coordinateFrom = start_location || initCoordinate;
  const coordinateTo = end_location || initCoordinate;
  const latitude = (coordinateFrom.lat + coordinateTo.lat) / 2;
  const longitude = (coordinateFrom.lng + coordinateTo.lng) / 2;
  const polylines =
    steps && steps.length > 0
      ? steps.map(step => {
          return [{latitude: step.start_location.lat, longitude: step.start_location.lng}, {latitude: step.end_location.lat, longitude: step.end_location.lng}]
        })
      : [];
  const textDuration = `${distance?.text} - ${duration?.text}`;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        {!isEqual(coordinateFrom, coordinateTo) ? (
          <Marker
            coordinate={{
              latitude: coordinateFrom.lat,
              longitude: coordinateFrom.lng,
            }}
            anchor={{x: 0.5, y: 0.5}}>
            <Opacity
              style={styles.viewMarkerFrom}
              bgColor={colors.primary}
              opacity={0.2}>
              <View style={[styles.markerFromDot, {backgroundColor: colors.primary}]} />
            </Opacity>
          </Marker>
        ) : null}
        <Marker
          coordinate={{
            latitude: coordinateTo.lat,
            longitude: coordinateTo.lng,
          }}
          anchor={{x: 0.5, y: 0.86}}>
          <View style={styles.viewMarkerTo}>
            <View style={styles.viewIcon}>
              <Icon name="map-marker" color={white} size={28} />
              <Icon
                name="map-marker"
                color={colors.error}
                size={24}
                containerStyle={styles.icon}
              />
            </View>
            <View style={[styles.dotTo, {backgroundColor: colors.error}]} />
          </View>
        </Marker>
        {polylines.length > 0 &&
          polylines.map((polyline, i) => (
            <Polyline
              key={i}
              coordinates={polyline}
              strokeColor={colors.primary} // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={3}
            />
          ))}
      </MapView>

      <Header
        leftComponent={
          <Icon
            name="chevron-left"
            size={30}
            color={black}
            onPress={() => navigation.goBack()}
            isRotateRTL
          />
        }
        centerComponent={
          <Text h3 medium h3Style={styles.text}>
            {t('common:text_delivery_address')}
          </Text>
        }
        containerStyle={styles.header}
      />
      {data ? (
        <VisitMap
          style={styles.viewVisit}
          textFrom={start_address}
          textTo={end_address}
          textDuration={textDuration}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: black,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  viewVisit: {
    position: 'absolute',
    left: 19,
    right: 19,
    bottom: 19,
  },
  viewMarkerFrom: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerFromDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  viewMarkerTo: {
    alignItems: 'center',
    position: 'relative',
  },
  viewIcon: {
    zIndex: 9999,
  },
  icon: {
    position: 'absolute',
    top: -1,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotTo: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: -10,
    zIndex: 1,
  },
});

export default DeliveryAddressScreen;

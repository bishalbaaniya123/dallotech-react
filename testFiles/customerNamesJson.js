let a = [
  'Leah',
  'Vikki',
  'Sherilyn',
  'Flo',
  'Beverley',
  'Rafaela',
  'Jody',
  'Lanie',
  'Wendel',
  'Orsola',
  'Shoshana',
  'Kippy',
  'Julieta',
  'Emelia',
  'Ingmar',
  'Jere',
  'Sollie',
  'Aldus',
  'Arlina',
  'Noach',
  'Lynnet',
  'Darya',
  'Raynard',
  'Herold',
  'Holly-anne',
  'Gunar',
  'Chery',
  'Donalt',
  'Brody',
  'Lodovico',
  'Becka',
  'Rakel',
  'Amble',
  'Keslie',
  'Merrick',
  'Elton',
  'Mitchell',
  'Mair',
  'Tallie',
  'Jemie',
  'Kendrick',
  'Nona',
  'Ferd',
  'Sumner',
  'Griswold',
  'Mil',
  'Brooke',
  'Cassy',
  'Thoma',
  'Morton',
  'Humbert',
  'Griffith',
  'Danita',
  'Jessie',
  'Cindy',
  'Derrick',
  'Dell',
  'Marquita',
  'Catlin',
  'Marlowe',
  'Son',
  'Andros',
  'Darby',
  'Corenda',
  'Sallyanne',
  'Erica',
  'Kirby',
  'Gary',
  'Eachelle',
  'Ajay',
  'Joannes',
  'Ulrich',
  'Ketty',
  'Cicely',
  'Clayson',
  'Paolina',
  'Debby',
  'Breena',
  'Shea',
  'Bartolomeo',
  'Annette',
  'Newton',
  'Luke',
  'Dalli',
  'Ulrick',
  'Sasha',
  'Jethro',
  'Stanwood',
  'Barny',
  'Rolland',
  'Ailbert',
  'Micheil',
  'Kelby',
  'Ally',
  'Perceval',
  'Brunhilde',
  'Pammi',
  'Wittie',
  'Shaughn',
  'Martynne'
];

let finalJson = {
  'content': [{
    'sales_query_id': 6,
    'created_on': '2019-05-05T07:22:19.000+0000',
    'customer': {
      'customer_id': 1,
      'customer_name': 'sdadsa'
    },
    'transport_city': {
      'transport_city_id': 2,
      'city': 'butwal'
    },
    'transport_type': 'AIR',
    'trade_lane': {
      'trade_lane_id': 6,
      'trade_lane_type': 'DOOR_TO_PORT',
      'origin_ware_house': {
        'ware_house_address_id': 1,
        'ware_house_name': 'bishnu'
      },
      'loading_port': 'india',
      'discharge_port': 'nepal',
      'destination_ware_house': {
        'ware_house_address_id': 2,
        'ware_house_name': 'bishnu'
      }
    },
    'business_type': 'EXPORT',
    'weight': 1,
    'packaging_type': 'ROLLS',
    'equipment': {
      'equipment_id': 6,
      'container_size': 'FEET_40_HQ',
      'container_type': 'DRY',
      'sc_type': 'FLAT_RACK',
      'gauge_type': 'OUT_GAUGE',
      'is_hazardous': true
    },
    'remarks': 'next remarks',
    'custom_clearance': true,
    'price': null,
    'sales_quotation_status': 'PRICE_PENDING'
  }, {
    'sales_query_id': 5,
    'created_on': '2019-05-05T07:21:58.000+0000',
    'customer': {
      'customer_id': 1,
      'customer_name': 'sdadsa'
    },
    'transport_city': {
      'transport_city_id': 2,
      'city': 'butwal'
    },
    'transport_type': 'AIR',
    'trade_lane': {
      'trade_lane_id': 5,
      'trade_lane_type': 'DOOR_TO_PORT',
      'origin_ware_house': {
        'ware_house_address_id': 1,
        'ware_house_name': 'bishnu'
      },
      'loading_port': 'india',
      'discharge_port': 'nepal',
      'destination_ware_house': {
        'ware_house_address_id': 2,
        'ware_house_name': 'bishnu'
      }
    },
    'business_type': 'EXPORT',
    'weight': 1,
    'packaging_type': 'ROLLS',
    'equipment': {
      'equipment_id': 5,
      'container_size': 'FEET_40_HQ',
      'container_type': 'DRY',
      'sc_type': 'FLAT_RACK',
      'gauge_type': 'OUT_GAUGE',
      'is_hazardous': true
    },
    'remarks': 'next remarks',
    'custom_clearance': true,
    'price': null,
    'sales_quotation_status': 'PRICE_PENDING'
  }, {
    'sales_query_id': 4,
    'created_on': '2019-05-05T07:20:06.000+0000',
    'customer': {
      'customer_id': 1,
      'customer_name': 'sdadsa'
    },
    'transport_city': {
      'transport_city_id': 2,
      'city': 'butwal'
    },
    'transport_type': 'SEA',
    'trade_lane': {
      'trade_lane_id': 4,
      'trade_lane_type': 'PORT_TO_PORT',
      'origin_ware_house': {
        'ware_house_address_id': 1,
        'ware_house_name': 'bishnu'
      },
      'loading_port': 'india',
      'discharge_port': 'nepal',
      'destination_ware_house': {
        'ware_house_address_id': 2,
        'ware_house_name': 'bishnu'
      }
    },
    'business_type': 'IMPORT',
    'weight': 1,
    'packaging_type': 'WOODEN_PALLETS',
    'equipment': {
      'equipment_id': 4,
      'container_size': 'FEET_20',
      'container_type': 'REFER',
      'sc_type': 'OPEN_TOP',
      'gauge_type': 'IN_GAUGE',
      'is_hazardous': true
    },
    'remarks': 'user 3 adding',
    'custom_clearance': true,
    'price': null,
    'sales_quotation_status': 'PRICE_PENDING'
  }],
  'pageable': {
    'sort': {
      'unsorted': false,
      'sorted': true,
      'empty': false
    },
    'pageSize': 5,
    'pageNumber': 0,
    'offset': 0,
    'paged': true,
    'unpaged': false
  },
  'totalPages': 1,
  'totalElements': 3,
  'last': true,
  'numberOfElements': 3,
  'first': true,
  'sort': {
    'unsorted': false,
    'sorted': true,
    'empty': false
  },
  'size': 5,
  'number': 0,
  'empty': false
};
let finalArray = [];

for (let i = 0; i < finalJson.content.length; i++) {
  let singleObject = finalJson.content[i];
  let singleArray = [];
  let containerSize = singleObject.equipment.container_size;
  if (containerSize === 'FEET_20') {
    containerSize = '20\'';
  } else if (containerSize === 'FEET_40') {
    containerSize = '40\'';
  } else if (containerSize === 'FEET_40_HQ') {
    containerSize = '40\'HQ';
  }

  let splitted = singleObject.packaging_type.split('_');
  let packagingFormatted = '';
  for (let i = 0; i < splitted.length; i++) {
    packagingFormatted += splitted[i].charAt(0)
      .toUpperCase() + splitted[i].slice(1)
      .toLowerCase() + ' ';
  }
  packagingFormatted = packagingFormatted.slice(0, -1);

  singleArray.push(
    singleObject.transport_type,
    singleObject.business_type,
    singleObject.trade_lane.trade_lane_type,
    containerSize + '/' + singleObject.equipment.container_type.charAt(0)
      .toUpperCase() + singleObject.equipment.container_type.slice(1)
      .toLowerCase(),
    packagingFormatted,
    singleObject.sales_query_id,
  );
  finalArray.push(singleArray);
}

let x = [
  ['AIR', 'IMPORT', 'DOOR_TO_DOOR', '20\'/Special Container/Open Top/In gauge', '', 1],
  ['SEA', 'EXPORT', 'DOOR_TO_PORT', '40\'HQ/Dry', 'Cartons', 2],
  ['RAIL', 'EXPORT', 'PORT_TO_DOOR', '40\'HQ/Dry', 'Cartons', 3],
  ['ROAD', 'EXPORT', 'PORT_TO_DOOR', '40\'HQ/Dry', 'Cartons', 4],
  ['AIR', 'EXPORT', 'PORT_TO_PORT', '40\'HQ/Dry', 'Cartons', 5],
];

let y = [{
  id: 1,
  name: 'sdadsa'
},
  {
    id: 2,
    name: 'sdadsa'
  }
];

let jsonToBeMade = {
  'sales_query_id': 19,
  'customer_id': 1,
  'transport_type': 'SEA',
  'trade_lane': {
    'trade_lane_type': 'PORT_TO_PORT',
    'origin_ware_house_id': 1,
    'loading_port': 'nse',
    'discharge_port': 'nepal',
    'destination_ware_house_id': 2
  },
  'transport_city_id': 2,
  'packing_type': 'CARTOONS',
  'business_type': 'IMPORT',
  'equipment_detail': {
    'container_size': 'INCH_20',
    'container_type': 'REFER',
    'sc_type': 'OPEN_TOP',
    'gauge_type': 'IN_GAUGE',
    'is_hazardous': true,
    'packaging_type': 'WOODEN_PALLETS'
  },
  'weight': 1,
  'free_time': 2,
  'remarks': 'sagar',
  'custom_clearance': true
};

let initialJson = {
  'sales_query_id': 15,
  'created_on': '2019-05-06T10:01:29.000+0000',
  'customer': {
    'customer_id': 1,
    'customer_name': 'bisahl'
  },
  'transport_city': {
    'transport_city_id': 2,
    'city': null
  },
  'transport_type': 'RAIL',
  'trade_lane': {
    'trade_lane_type': 'PORT_TO_DOOR',
    'origin_ware_house': {
      'ware_house_address_id': 1,
      'ware_house_name': 'lalitpur'
    },
    'loading_port': 'india',
    'discharge_port': 'nepal',
    'destination_ware_house': {
      'ware_house_address_id': 2,
      'ware_house_name': 'jamal'
    }
  },
  'business_type': 'IMPORT',
  'weight': 1,
  'packaging_type': 'BALES',
  'equipment': {
    'container_size': 'FEET_40',
    'container_type': 'SPECIAL_CONTAINER',
    'sc_type': 'FLAT_RACK',
    'gauge_type': 'IN_GAUGE',
    'is_hazardous': true
  },
  'remarks': 'next remarks sdsd',
  'custom_clearance': false,
  'price': null,
  'free_time': '5',
  'sales_quotation_status': 'PRICE_PENDING'
};

intialJson = {
  'sales_query_id': 15,
  'created_on': '2019-05-06T10:01:29.000+0000',
  'customer': {
    'customer_id': 2,
    'customer_name': 'bisahl'
  },
  'transport_city': {
    'transport_city_id': 2,
    'city': null
  },
  'transport_type': 'SEA',
  'trade_lane': {
    'trade_lane_type': 'PORT_TO_DOOR',
    'origin_ware_house': {
      'ware_house_address_id': 1,
      'ware_house_name': 'lalitpur'
    },
    'loading_port': 'india',
    'discharge_port': 'nepal',
    'destination_ware_house': {
      'ware_house_address_id': 2,
      'ware_house_name': 'jamal'
    }
  },
  'business_type': 'EXPORT',
  'weight': 1,
  'packaging_type': 'ROLLS',
  'equipment': {
    'container_size': 'FEET_40_HQ',
    'container_type': 'DRY',
    'sc_type': 'FLAT_RACK',
    'gauge_type': 'OUT_GAUGE',
    'is_hazardous': true
  },
  'remarks': 'next remarks',
  'custom_clearance': true,
  'price': null,
  'free_time': 2,
  'sales_quotation_status': 'PRICE_PENDING'
};

finalJson = {
  sales_query_id: initialJson.sales_query_id,
  customer_id: initialJson.customer.customer_id,
  transport_type: initialJson.transport_type,
  trade_lane: {
    trade_lane_type: initialJson.trade_lane.trade_lane_type,
    origin_ware_house_id: initialJson.trade_lane.origin_ware_house.ware_house_address_id,
    loading_port: initialJson.trade_lane.loading_port,
    discharge_port: initialJson.trade_lane.discharge_port,
    destination_ware_house_id: initialJson.trade_lane.destination_ware_house.ware_house_address_id,
  },
  transport_city_id: initialJson.transport_city.transport_city_id,
  packaging_type: initialJson.packaging_type,
  business_type: initialJson.business_type,
  equipment_detail: {
    container_size: initialJson.equipment.container_size,
    container_type: initialJson.equipment.container_type,
    sc_type: initialJson.equipment.sc_type,
    gauge_type: initialJson.equipment.gauge_type,
    is_hazardous: initialJson.equipment.is_hazardous,
  },
  weight: initialJson.weight,
  free_time: initialJson.free_time,
  remarks: initialJson.remarks,
  custom_clearance: initialJson.custom_clearance
};

switch (initialJson.trade_lane.trade_lane_type) {
  case 'DOOR_TO_PORT':
    finalJson.trade_lane.destination_ware_house_id = null;
    break;
  case 'PORT_TO_DOOR':
    finalJson.trade_lane.origin_ware_house_id = null;
    break;
  case 'PORT_TO_PORT':
    finalJson.trade_lane.origin_ware_house_id = null;
    finalJson.trade_lane.destination_ware_house_id = null;
    break;
}

let finalJsonTest = [
  ['IMPORT', 'DOOR_TO_DOOR', '20\'/Special Container/Open Top/In gauge', 'Cartons', 1],
  ['EXPORT', 'DOOR_TO_PORT', '40\'HQ/Dry', 'Cartons', 2],
  ['EXPORT', 'PORT_TO_DOOR', '40\'HQ/Dry', 'Cartons', 3],
  ['EXPORT', 'PORT_TO_DOOR', '40\'HQ/Dry', 'Cartons', 4],
  ['EXPORT', 'PORT_TO_PORT', '40\'HQ/Dry', 'Cartons', 5],
];


finalJson = {
  'content': [
    {
      'sales_query_id': 32,
      'created_on': '2019-05-08T04:38:48.000+0000',
      'customer': {
        'customer_id': 2,
        'customer_name': 'bisahl'
      },
      'transport_city': {
        'transport_city_id': null,
        'city': null
      },
      'transport_type': 'SEA',
      'trade_lane': {
        'trade_lane_type': 'PORT_TO_DOOR',
        'origin_ware_house': {
          'ware_house_address_id': 1,
          'ware_house_name': 'lalitpur'
        },
        'loading_port': 'india',
        'discharge_port': 'nepal',
        'destination_ware_house': {
          'ware_house_address_id': 2,
          'ware_house_name': 'jamal'
        }
      },
      'business_type': 'EXPORT',
      'weight': 1,
      'packaging_type': 'ROLLS',
      'equipment': {
        'container_size': 'FEET_40_HQ',
        'container_type': 'DRY',
        'sc_type': 'FLAT_RACK',
        'gauge_type': 'OUT_GAUGE',
        'is_hazardous': true
      },
      'remarks': 'next remarks',
      'custom_clearance': true,
      'price': null,
      'free_time': 2,
      'sales_quotation_status': 'PRICE_PENDING'
    }
  ],
  'pageable': {
    'sort': {
      'unsorted': false,
      'sorted': true,
      'empty': false
    },
    'pageSize': 100,
    'pageNumber': 0,
    'offset': 0,
    'paged': true,
    'unpaged': false
  },
  'last': true,
  'totalPages': 1,
  'totalElements': 1,
  'numberOfElements': 1,
  'first': true,
  'sort': {
    'unsorted': false,
    'sorted': true,
    'empty': false
  },
  'size': 100,
  'number': 0,
  'empty': false
};

finalArray = [];

for (let i = 0; i < finalJson.content.length; i++) {
  let singleObject = finalJson.content[i];
  let singleArray = [];
  let containerSize = singleObject.equipment.container_size;
  if (containerSize === 'FEET_20') {
    containerSize = '20\'';
  } else if (containerSize === 'FEET_40') {
    containerSize = '40\'';
  } else if (containerSize === 'FEET_40_HQ') {
    containerSize = '40\'HQ';
  }

  let splittedPackaging = singleObject.packaging_type.split('_');
  let splittedTradeLane = singleObject.trade_lane.trade_lane_type.split('_');

  let tradeLaneFormatted = '';
  for (let j = 0; j < splittedTradeLane.length; j++) {
    tradeLaneFormatted += splittedTradeLane[j].charAt(0)
      .toUpperCase() + splittedTradeLane[j].slice(1)
      .toLowerCase() + ' ';
  }

  let packagingFormatted = '';
  for (let k = 0; k < splittedPackaging.length; k++) {
    packagingFormatted += splittedPackaging[k].charAt(0)
      .toUpperCase() + splittedPackaging[k].slice(1)
      .toLowerCase() + ' ';
  }
  packagingFormatted = packagingFormatted.slice(0, -1);

  singleArray.push(
    singleObject.business_type.charAt(0)
      .toUpperCase() + singleObject.business_type.slice(1)
      .toLowerCase(),
    tradeLaneFormatted,
    containerSize + '/' + singleObject.equipment.container_type.charAt(0)
      .toUpperCase() + singleObject.equipment.container_type.slice(1)
      .toLowerCase(),
    packagingFormatted,
    singleObject.sales_query_id,
  );
  finalArray.push(singleArray);
}


let initialData = [
  {
    "follow_up_id": 1,
    "customer": {
      "customer_id": 2,
      "customer_name": "bisahl"
    },
    "meeting_with": "Rajiv Shah",
    "discussion": "launching the product",
    "comment": "Need further polishing"
  }
];

finalArray = [];

for(let i = 0; i<initialData.length; i++){
  let singleItem = initialData[i];
  let singleArray = [];
  singleArray.push(
    singleItem.customer.customer_name,
    singleItem.meeting_with,
    singleItem.discussion,
    singleItem.comment,
    singleItem.follow_up_id,
  );
  finalArray.push(singleArray);
}


const firstCapital = (word) => {

  let splitted = word.split('_');
  let formattedWord = '';
  for (let j = 0; j < splitted.length; j++) {
    formattedWord += splitted[j].charAt(0)
      .toUpperCase() + splitted[j].slice(1)
      .toLowerCase() + ' ';
  }
  formattedWord = formattedWord.slice(0, -1);

  return formattedWord;
};


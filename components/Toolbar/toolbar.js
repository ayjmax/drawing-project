import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, Image } from "react-native";

//Styling
import styles from "./toolbarStyles";

//Icons
const penIcon = require('../../assets/pencil.png');

//Consider adding more colors
const colors = ['darkturquoise', 'mediumvioletred', 'forestgreen', 'black'];
const strokeWidths = {'thin' : 5,
                      'normal' : 8,
                      'bold' : 13,
                      'extra-bold': 20};

function Toolbar(props) {
  const [penOpen, setPenButton] = useState(false);

  //User selects color
  const pressColor = (color) => {
    props.setColor(color);
  }

  //User opens stroke width menu/options
  const pressPen = () => {
    setPenButton(!penOpen);
  }

  //User selects certain stroke width
  const selectWidth = (width, name) => {
    console.log(`Selected width: ${name}`); //For debugging
    if (props.sWidth === width) {
      return;
    }
    props.setWidth(width);
  }

  //For debugging
  useEffect(() => {
    console.log(`Pen Button Open: ${penOpen}`);
  }, [penOpen])

  return (
    <View style={styles.toolBarView}>
      <TouchableOpacity
        style={{...styles.touchOpacity, ...styles.strokeWidthButton}}
        onPress={pressPen}
      >
        <Image source={penIcon} style={styles.penIcon}></Image>
      </TouchableOpacity>

      {penOpen &&
        <View style={styles.strokeWidthMenu}>
          {Object.keys(strokeWidths).map((width) => (
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#c6c6c6"
              onPress={() => selectWidth(strokeWidths[width], width)}  
              key={width}
              style={styles.strokeWidthOption}
            >
              <View
                style={styles.blackLineIcon(strokeWidths[width])}
              ></View>
            </TouchableHighlight>
          ))}
        </View>
      }


      {colors.map((color) => (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => pressColor(color)}
          style={{...styles.touchOpacity, ...styles.iconColor(color)}}
          key={color}
        >
        </TouchableOpacity>
      ))}
    </View>
  );
};

//Exports
export default Toolbar;
import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'
import { generate } from 'shortid'
import _ from 'lodash'

import AppText from './AppText'
import HalfCircle from '../assets/half-circle.svg'
import QuarterCircle from '../assets/quarter-circle.svg'
import ThreeQuarterCircle from '../assets/three-quarter-circle.svg'
import Circle from '../assets/circle.svg'
import InStockCorner from '../assets/corner-in_stock'
import { AnimatedSVGPath } from "react-native-svg-animations"

import { useCocktails, useStock } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function ClassListMap() {

        const { cocktails } = useCocktails()
        const { isInStock } = useStock()

        function buildPartArray(parts){
            var part_array = []

            var remainder = parts.toString().split('.')[1]

            if(parts >= 1){
                for (var i = 1; i <= parts; i++){
                    part_array.push(1)
                }
            }
            if(remainder != undefined){
                remainder = Number("." + remainder)
                part_array.push(remainder)
            }

            // console.log('part array', part_array, parts)

            return part_array
        }

        function Shape(props){
            // console.log("Shape props", props)
            if (props.part == 0.25) {
                return (
                    <QuarterCircle width={props.width} height={props.height} />
                )
            }
            if (props.part == 0.5) {
                return (
                    <HalfCircle width={props.width} height={props.height} />
                )
            }
            if (props.part == 0.75) {
                return (
                    <ThreeQuarterCircle width={props.width} height={props.height} />
                )
            }
            if (props.part == 1) {
                return (
                    <Circle width={props.width} height={props.height} />
                )
            }
            return null
        }
        function ShapeMap(props){
            var shape_array = buildPartArray(props.parts)
            return shape_array.map((part, i) => {
                var key = generate()
                return (
                    <View key={key} style={[styles.shape_container, getShapeMargin(part)]}>
                        <Shape height={9} width={9} part={part} />
                    </View>
                )
            })
        }
        function getShapeMargin(part){
            // console.log('width for part', part)
            if(part == 0.25 || part == 0.25){
                return {
                    marginLeft: -10
                }
            }
            return 25
        }

        function Part(props){
            if(props.last){
                return (
                    <View style={{flexDirection:'row'}}>
                        <ShapeMap parts={props.parts} last={props.last} />
                    </View>
                )
            } else {
                return (
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                        <ShapeMap parts={props.parts} last={props.last} />
                        <AppText>|</AppText>
                    </View>
                )
            }
        }
        function PartMap(props){
            return (
                <View style={styles.part_map_container}>
                    {props.ingredients.map((ingredient, i) => (
                        <View style={styles.part_container} key={`part-${i}`}>
                            <Part parts={ingredient.parts} last={(i + 1 == props.ingredients.length)} />
                        </View>
                    ))}
                </View>
            )
        } 
        function Name(props){
            if(props.last){
                return (
                    <AppText style={{color: isInStock(props.ingredient_name) ? 'black' : 'grey'}}> {props.ingredient_name}</AppText>
                )
            } else {
                return (
                    <AppText style={{color: isInStock(props.ingredient_name) ? 'black' : 'grey'}}> {props.ingredient_name} |</AppText>
                )
            }
        }
        function NameMap(props){
            return (
                <View style={styles.name_container}>
                    {props.ingredients.map((ingredient, i) => (
                        <View key={`part-${i}`}>
                            <Name ingredient_name={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
                        </View>
                    ))}
                </View>
            )
        } 

        function sortedIngredients(ingredients){
            return _.orderBy(ingredients, 'parts', 'desc')
        }
        
        return cocktails.map(cocktail=>
            (
                <View style={styles.cocktail} key={cocktail.id}>
                    <View style={styles.cocktail_name_container}>
                        <AppText>
                            <Text style={styles.cocktail_text}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <PartMap ingredients={sortedIngredients(cocktail.ingredients)} />
                    <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
                </View>
            )
        )
}

function ClassList(){ 
    // var d2 = "M41670.31 37784.72l-19949.12 -28515.48 -12536.53 12536.53 28630.3 20029.44c102.61,-282.18 224.09,-559.03 364.24,-828.7l-22753.06 -18726.02c-19.5,-13.5 -38.06,-28.92 -55.42,-46.28 -156.2,-156.21 -156.2,-409.48 0,-565.69l6213.22 -6213.22 0.96 0.97c8.79,-8.77 18.02,-17.22 27.77,-25.28 169.63,-140.34 420.92,-116.6 561.27,53.04l18686.91 22705.53c262.6,-153.49 533.03,-288.48 809.46,-404.84zm-19567.92 -29365.14l6369.47 9104.58 7527.19 -7527.18 0.98 0.97c39.2,-39.26 87.26,-70.93 142.65,-91.57 206.25,-76.89 435.77,27.99 512.66,234.23l3379.07 9031.56 9927.69 -9927.69 0.69 0.69c69.34,-69.36 164.23,-113.48 269.99,-116.7 220.28,-6.72 404.3,166.42 411.02,386.7l1191.4 40846.02 -0.2 0.01 0.19 13.25 -4.68 970.45c-0.57,218.25 -176.74,395.93 -395.53,397.75l-984.49 7.53c-7.26,0.21 -14.56,0.24 -21.9,0.06l-40967.21 -1021.16c-108.48,5.03 -218.64,-33.87 -301.48,-116.72 -156.21,-156.2 -156.21,-409.48 0,-565.68l9927.69 -9927.7 -8999.65 -3367.13c-64.3,-17.83 -125,-51.99 -175.54,-102.53 -156.21,-156.21 -156.21,-409.48 0,-565.69l7527.18 -7527.19 -9090.26 -6359.44c-23.88,-15.29 -46.48,-33.35 -67.36,-54.22 -156.2,-156.21 -156.2,-409.48 0,-565.68l13210.55 -13210.56 0.18 0.18c16.06,-16.01 33.67,-30.89 52.86,-44.37 180.61,-126.93 429.92,-83.38 556.84,97.23zm6835.17 9770.25l2658.32 3799.85 4062.72 -4062.72 1.26 1.27c33.44,-33.45 73.42,-61.48 119.17,-81.93 200.74,-89.7 436.21,0.34 525.91,201.09l8545.86 19205.92c390.98,25.93 780.2,84.5 1163.22,175.79l-9887.78 -26427.95 -7188.68 7188.68zm3124.02 4465.52l10391.49 14853.7c498.79,-142.97 1010.34,-229.4 1524.58,-259.32l-8163.59 -18346.86 -3752.48 3752.48zm5513.77 19987.84l-15004.58 -10497.03 -3726.41 3726.41 18550.38 8254.16c7.3,-498.19 67.46,-995.77 180.61,-1483.54zm-15670.25 -10962.73l-3799.84 -2658.32 -7188.69 7188.69 26766.74 10014.51c-119.51,-402.72 -201.95,-814.09 -247.43,-1228.74 -39.47,-4.53 -78.92,-15.07 -117.12,-32.14l-19329.88 -8601.01c-200.75,-89.7 -290.79,-325.17 -201.09,-525.91 20.45,-45.75 48.48,-85.73 81.93,-119.16l-1.27 -1.27 4036.65 -4036.65zm18437.35 -11684.96l1784.19 4768.77 4075.03 -4075.03 0.44 0.44c59.28,-59.37 137.67,-100.64 227.16,-113.14 218.45,-30.51 420.27,121.85 450.78,340.3l2607.77 18531.9c548.35,584.48 977.42,1240.14 1287.13,1936.06l-901.88 -30919.92 -9530.62 9530.62zm2092.16 5591.91l4544.83 12147.38c556.34,221.81 1089.92,517.97 1585.57,888.34l-2364.28 -16801.58 -3757.84 3757.83 -8.28 8.03zm-4515.55 21577.19l-12416.04 -4645.34 -3739.31 3739.31 17215.77 2405.79c-377.46,-459.11 -687.59,-955.04 -930.24,-1474.68 -43.35,-0.99 -87.27,-9.09 -130.18,-25.08zm-13239.37 -4953.39l-4770.53 -1784.84c-7.8,9.35 -16.04,18.46 -24.83,27.24l-9500.27 9500.27 31440.13 783.68c-682.76,-268.34 -1331.8,-648.19 -1919.14,-1139.58 -13.92,-0.47 -27.94,-1.67 -42.04,-3.63l-19004.68 -2655.79c-218.45,-30.51 -370.81,-232.33 -340.3,-450.78 12.5,-89.49 53.77,-167.88 113.14,-227.16l-0.44 -0.44 4048.96 -4048.97zm21940.07 8645.9l3825.38 95.35 589.57 -4.51 2.73 -564.12 -107.53 -3686.42c-339.89,903.06 -873.15,1749.92 -1599.83,2476.6 -789.04,789.05 -1719.78,1350.08 -2710.32,1683.1zm-7177.98 -11571.41c238.33,-238.34 489.64,-455.8 751.57,-652.52l-18354.4 -22301.52 -5591.87 5591.87 22344.88 18390.09c245.54,-362.42 528.8,-706.9 849.82,-1027.92zm4944.15 -1247.98c-1584.65,0 -3169.36,604.56 -4378.47,1813.67 -1209.1,1209.1 -1813.66,2793.8 -1813.66,4378.46 0,1584.65 604.57,3169.36 1813.67,4378.47 1209.1,1209.1 2793.82,1813.67 4378.47,1813.66 1584.65,0 3169.36,-604.55 4378.46,-1813.66 1209.11,-1209.11 1813.67,-2793.82 1813.66,-4378.47 0.01,-1584.64 -604.55,-3169.35 -1813.66,-4378.46 -1209.1,-1209.11 -2793.82,-1813.68 -4378.47,-1813.67zm-2288.35 3903.78c631.88,-631.88 1460.11,-947.83 2288.35,-947.82 828.24,-0.01 1656.48,315.94 2288.35,947.82 631.89,631.89 947.83,1460.11 947.82,2288.35 0.01,828.25 -315.93,1656.47 -947.82,2288.36 -631.87,631.88 -1460.11,947.82 -2288.35,947.82 -828.24,0 -1656.48,-315.94 -2288.35,-947.82 -631.88,-631.88 -947.83,-1460.11 -947.82,-2288.36 -0.01,-828.24 315.94,-1656.47 947.82,-2288.35zm2288.35 -147.91c-623.45,-0.01 -1246.93,237.86 -1722.67,713.6 -475.72,475.72 -713.6,1099.22 -713.6,1722.66 0,623.45 237.88,1246.95 713.6,1722.67 475.73,475.73 1099.22,713.61 1722.67,713.6 623.45,0.01 1246.94,-237.87 1722.67,-713.6 475.73,-475.73 713.6,-1099.22 713.6,-1722.67 0,-623.44 -237.87,-1246.93 -713.6,-1722.66 -475.73,-475.73 -1099.22,-713.61 -1722.67,-713.6z"
    var d2 = "M30631 55031l-1222 0 0 -1c-191,0 -361,-137 -394,-332 -102,-594 -214,-1320 -332,-2081 -1078,-6975 -2631,-17019 -12938,-19563l0 -1c-174,-43 -303,-200 -303,-387l0 -104 0 0c0,-6950 1601,-13244 4189,-17806 1963,-3460 4498,-5935 7346,-6969 -351,-339 -768,-678 -1269,-1035 -56,-38 -104,-90 -136,-155 -98,-198 -16,-437 181,-534 1467,-726 2927,-1098 4412,-1094 1479,4 2975,380 4520,1151 62,27 118,70 161,128 131,177 94,427 -83,558 -540,400 -983,773 -1353,1144 2683,1120 5072,3527 6942,6829 2598,4585 4205,10910 4205,17887l-1 0c0,180 -122,343 -304,388 -10284,2545 -11829,12601 -12900,19576 -107,699 -210,1368 -325,2042 -21,201 -191,359 -398,359zm4 -41497l-111 11221c778,-4631 2545,-9260 6515,-13215 -1279,-1371 -2691,-2382 -4192,-2953 -208,268 -386,542 -541,832 -499,932 -783,2053 -1110,3648 4,22 6,45 6,68 0,221 -179,400 -400,400l-168 0zm-907 11196l110 -11196 -160 0c-215,0 -391,-170 -400,-383 -2,-8 -4,-15 -5,-23 -333,-1635 -605,-2800 -1104,-3764 -170,-328 -368,-635 -606,-934 -1610,515 -3126,1533 -4494,2961 3958,3881 5803,8598 6658,13339zm279 -11996l445 0c327,-1574 626,-2706 1153,-3690 133,-249 280,-486 444,-717 -674,-183 -1363,-278 -2065,-278l0 -2 -19 0c-529,1 -1052,57 -1566,163 180,253 338,514 480,788 518,1001 802,2155 1128,3736zm-2171 -5211c695,-177 1405,-271 2129,-272l19 0 0 -2c892,0 1764,138 2611,403 329,-360 713,-715 1171,-1082 -1232,-537 -2425,-800 -3600,-803 -1158,-3 -2304,247 -3458,737 439,343 810,678 1128,1020zm2199 31402l-15 0c3,54 5,108 7,162 2,-54 5,-108 8,-162zm-379 -4235c-19,-7330 -570,-16260 -7124,-22707 -796,920 -1536,1983 -2208,3168 -366,645 -711,1325 -1034,2038 7141,5010 9532,11232 10366,17501zm7914 -22551c-6009,6015 -6777,13718 -6840,20508 1076,-5548 3653,-10958 9973,-15415 -326,-720 -674,-1408 -1043,-2058 -639,-1128 -1339,-2145 -2090,-3034zm-7543 37818l-19 2c5,76 10,151 15,227 5,-76 10,-151 15,-227l-11 -1zm-720 -8358c-162,-8179 -1016,-17042 -10343,-23665 -708,1689 -1296,3544 -1743,5527 8632,4377 11126,11079 12086,18138zm11720 -23621c-9252,6606 -10116,15427 -10280,23575 968,-7028 3469,-13700 12018,-18061 -447,-1978 -1033,-3829 -1738,-5515zm1912 6322c-10828,5632 -11442,15282 -12021,24416 -56,889 -113,1774 -177,2648 1107,-7031 3043,-16360 13017,-19006 -19,-2827 -306,-5538 -818,-8059zm-25890 -31c-512,2529 -796,5251 -809,8089 10063,2661 11966,12090 13076,19136 -71,-935 -131,-1881 -191,-2833 -579,-9136 -1191,-18766 -12075,-24392zm-810 8286l0 7 0 -7zm-797 7c0,-95 -1,-58 -1,0l1 0zm-1 0c0,90 -1,228 -1,0l1 0z"
    var d = 'M366.2,204.2c-9.8,0-15-5.6-15-15.1V77.2h-85v28h19.5c9.8,0,8.5,2.1,8.5,11.6v72.4c0,9.5,0.5,15.1-9.3,15.1H277h-20.7c-8.5,0-14.2-4.1-14.2-12.9V52.4c0-8.5,5.7-12.3,14.2-12.3h18.8v-28h-127v28h18.1c8.5,0,9.9,2.1,9.9,8.9v56.1h-75V53.4c0-11.5,8.6-13.3,17-13.3h11v-28H2.2v28h26c8.5,0,12,2.1,12,7.9v142.2c0,8.5-3.6,13.9-12,13.9h-21v33h122v-33h-11c-8.5,0-17-4.1-17-12.2v-57.8h75v58.4c0,9.1-1.4,11.6-9.9,11.6h-18.1v33h122.9h5.9h102.2v-33H366.2z';
    return (
        <ScrollView style={styles.view}>
            {/* <ClassListMap></ClassListMap> */}

            <View style={{width: 200, height: 200}}>
                <AppText>svg</AppText>
                {/* <InStockCorner /> */}
                {/* <AnimatedSVGPath 
                    d={d}
                    strokeWidth={10}
                    loop={true}
                    fill={"black"}
                    duration={10000}
                    scale={0.4}
                    delay={100}
                    strokeColor={"green"}
                /> */}
                <AnimatedSVGPath 
                    d={d2}
                    strokeWidth={10}
                    loop={false}
                    fill={"black"}
                    duration={10000}
                    scale={0.4}
                    delay={100}
                    width={100}
                    height={100}
                    strokeColor={"green"}
                />
                <AppText> /svg</AppText>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    cocktail: {
        marginBottom: 60,
        // marginLeft: 10
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10
    },
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: windowHeight - 100
    },
    part_map_container: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
        // width: 100,
        // height:100
    },
    part_container: {
        // flex: 1,
        flexDirection: 'row',
        // width: 100,
        // height:100
    },
    cocktail_name_container: {
        // flex: 1
    },
    name_container: {
        // flex: 1
        marginTop: 10,
        flexDirection: 'row'
    },
    shape_container: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center'
        // width: 100
        // flex: 3
    }
})

export default ClassList
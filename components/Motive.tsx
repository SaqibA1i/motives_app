import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import MotiveStatus from './MotiveStatus';
import Entypo from '@expo/vector-icons/Entypo';


const Motive = () => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Avatar.Text size={54} label="MA" />
                    <View>
                        <View style={styles.headerName}>
                            <Text style={styles.nameText}>Muhammad</Text>
                            <MotiveStatus status='happening' />
                        </View>
                        <Text style={styles.locationText}>Basketball @5, st marcellus</Text>
                        <View style={styles.timeDate}>
                            <Text style={styles.timeDateLabel}>Time: <Text style={styles.timeDateText}>5 am</Text></Text>
                            <Text style={styles.timeDateLabel}>Date: <Text style={styles.timeDateText}>05/07/2024</Text></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.upDownContainer}>
                    <View style={styles.upDown}>
                        <Image
                            style={styles.updownImage}
                            source={require('../assets/images/down.png')}
                        />
                        <View style={styles.avatarContainer}>
                            <Avatar.Text style={styles.avatar} size={20} label="C" />
                            <Avatar.Text style={[styles.avatar, styles.avatar2]} size={20} label="D" />
                            <Avatar.Text style={[styles.avatar, styles.avatar3]} size={20} label="E" />
                        </View>
                        <Text>10</Text>
                    </View>
                    <View style={styles.upDown}>
                        <Image
                            style={[styles.updownImage, styles.notDownImage]}
                            source={require('../assets/images/notDown.png')}
                        />
                        <View style={styles.avatarContainer}>
                            <Avatar.Text style={styles.avatar} size={20} label="F" />
                            <Avatar.Text style={[styles.avatar, styles.avatar2]} size={20} label="G" />
                            <Avatar.Text style={[styles.avatar, styles.avatar3]} size={20} label="H" />
                        </View>
                        <Text>10</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreUpDown}>
                    <Entypo name="chevron-thin-up" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        height: 124,
        width: '100%',
        paddingTop: 18,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 9,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        gap: 14
    },
    headerName: {
        flexDirection: 'row',
        gap: 13,
    },
    nameText: {
        fontFamily: 'PlusJakartaSans_800ExtraBold',
        fontSize: 17,
        color: '#1F2937'
    },
    locationText: {
        fontFamily: 'PlusJakartaSans_400Regular',
        fontSize: 12,
    },
    timeDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 10
    },
    timeDateLabel: {
        fontSize: 10,
        fontFamily: 'PlusJakartaSans_500Medium',
    },
    timeDateText: {
        fontSize: 10,
        fontFamily: 'PlusJakartaSans_400Regular',
    },
    upDownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginLeft: 9
    },
    upDown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    updownImage: {
        height: 30,
        width: 30,
        marginRight: 6
    },
    notDownImage: {
        transform: [{ scaleY: -1 }],

    },
    avatarContainer: {
        flexDirection: 'row',
        position: 'relative',
        height: 20,
        width: 56,
    },
    avatar: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        color: 'white'
    },
    avatar2: {
        left: 16
    },
    avatar3: {
        left: 32,
    },
    moreUpDown: {
        marginRight: 25
    }
});

export default Motive
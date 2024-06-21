import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    status: string;
};

const MotiveStatus = ({ status }: Props) => {
    const getBackgroundColor = () => {
        switch (status) {
            case 'happening':
                return '#6FB6E9';
            case 'cancelled':
                return '#F05959';
            default:
                return 'gray';
        }
    }

    const getText = () => {
        switch (status) {
            case 'happening':
                return 'Happening';
            case 'cancelled':
                return 'Cancelled';
            default:
                return 'IDK';
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
            <Text style={styles.statusText}>{getText()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

        paddingVertical: 7,
        paddingHorizontal: 13,
    },
    statusText: {
        color: 'white',
        fontSize: 8,
        fontFamily: 'PlusJakartaSans_400Regular',
    }
});

export default MotiveStatus
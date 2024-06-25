import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";
import { Avatar } from "react-native-paper";
import React, { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useQuery, useQueryClient } from "react-query";
import searchUsers from "./api/searchUsers";
import { User } from "./types";
import fetchMyFriends from "./api/fetchMyFriends";
import axios from "axios";
import { getValueFor } from "./helpers/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebaseConfig";
import { COLLECTIONS } from "@/constants/Collections";

const CreateMotive = ({ onCancel }: { onCancel: () => void }) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hour, setHour] = useState<number>(9);
  const [minute, setMinute] = useState<string>("01");
  const [ampm, setAmpm] = useState("AM");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [usersShown, setUsersShown] = useState<string[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: friendsU, isLoading: loading } = useQuery(
    "friends",
    fetchMyFriends
  );

  // send a request to the backend 1s after the user stops typing
  useEffect(() => {
    // fetch friends from the backend
    // setFriends(friends);
    let temp = [];
    for (let a in friendsU) {
      //@ts-ignore
      temp.push(friendsU[a] as Friend);
    }
    setFriends(temp);
  }, [friendsU]);
  const onChangeTime = (
    event: DateTimePickerEvent,
    selectedTime?: Date | undefined
  ) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
    setHour(currentTime.getHours() % 12 || 12);
    setMinute(("0" + currentTime.getMinutes()).slice(-2));
    setAmpm(currentTime.getHours() >= 12 ? "PM" : "AM");
  };

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const showTimepicker = () => {
    setShowTime(true);
  };

  const showDatePicker = () => {
    setShowDate(true);
  };

  const ToggleDownButton = ({ uid }: { uid: string }) => {
    const toggleImage = () => {
      if (usersShown.includes(uid)) {
        // remove user from showMotiveTo
        let temp = usersShown;
        temp = temp.filter((user) => user !== uid);
        setUsersShown([...temp]);
      } else {
        // add user to showMotiveTo
        // make sure no duplicates of uid
        usersShown.includes(uid) ? null : setUsersShown([...usersShown, uid]);
      }
    };

    return (
      <TouchableOpacity onPress={toggleImage}>
        <Image
          style={styles.updownImage}
          source={
            usersShown.includes(uid)
              ? require("../assets/images/down.png")
              : require("../assets/images/notDown.png")
          }
        />
      </TouchableOpacity>
    );
  };

  const onSubmit = async () => {
    const uid = auth.currentUser?.uid;
    const newMotive = {
      user_id: uid,
      time_date: time,
      description: description,
      location: location,
      status: true,
      // showMotiveTo: usersShown,
    };

    if (description === "") {
      setError("Please enter a description");
    } else if (location === "") {
      setError("Please enter a location");
    } else if (usersShown.length === 0) {
      setError("Please select at least one friend to show the motive to");
    } else {
      // make req
      const newMotiveId = uid + new Date().toISOString();
      await setDoc(doc(db, "motive", newMotiveId), newMotive);

      // save the motive id to the users shown
      for (let userId in usersShown) {
        const user = usersShown[userId];
        const currMotives = await getDoc(doc(db, "users", user));

        if (!currMotives.exists()) {
          return;
        }

        const currMotivesData = currMotives.data()?.motives;
        const newMotives = currMotivesData
          ? [...currMotivesData, newMotiveId]
          : [newMotiveId];
        await updateDoc(doc(db, COLLECTIONS.USERS, user), {
          motives: newMotives,
        });
        queryClient.invalidateQueries("myMotives");
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Motive</Text>
        <TouchableOpacity>
          <Text style={styles.closeText} onPress={onCancel}>
            X
          </Text>
        </TouchableOpacity>
      </View>
      {/* Time */}
      <Text>Time</Text>
      <TouchableOpacity onPress={showTimepicker}>
        <View style={styles.timePickerContainer}>
          {showTime && (
            <DateTimePicker
              value={time}
              mode={"time"}
              is24Hour={false}
              display="default"
              onChange={onChangeTime}
            />
          )}
          <View style={styles.hourTimer}>
            <Text style={styles.timerText}>{hour}</Text>
          </View>
          <View>
            <Text style={styles.colonText}>:</Text>
          </View>
          <View style={styles.minuteTimer}>
            <Text style={styles.timerText}>{minute}</Text>
          </View>
          <View style={styles.ampm}>
            <View
              style={[
                styles.am,
                ampm === "AM" ? styles.ampmSelected : styles.ampmNotSelected,
              ]}
            >
              <Text style={styles.amText}>AM</Text>
            </View>
            <View
              style={[
                styles.pm,
                ampm === "PM" ? styles.ampmSelected : styles.ampmNotSelected,
              ]}
            >
              <Text style={styles.pmText}>PM</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* Date */}
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={showDatePicker}>
          <View style={styles.dateTitle}>
            <Text style={styles.dateTitleText}>Select Date</Text>
          </View>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <View style={styles.date}>
          <Text style={styles.dateText}>
            {("0" + date.getDate()).slice(-2) +
              "/" +
              ("0" + (date.getMonth() + 1)).slice(-2) +
              "/" +
              date.getFullYear()}
          </Text>
        </View>
      </View>
      {/* Description */}
      <Text style={styles.descriptionTitle}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
      />
      {/* Location */}
      <Text style={styles.descriptionTitle}>Location</Text>
      <TextInput
        style={[styles.input, styles.locationInput]}
        multiline={true}
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      {/* Show Motive To */}
      <View style={styles.showMotiveContainer}>
        <Text style={styles.descriptionTitle}>Show Motive to</Text>
        {loading && <Text>Loading...</Text>}
        <ScrollView style={styles.motiveList}>
          {friends.map((friend) => (
            <View style={styles.showMotive} key={friend.id}>
              <ToggleDownButton uid={friend.id} />
              <Avatar.Text size={24} label={friend.name[0]} />
              <Text style={styles.descriptionTitle}>
                {friend.name} ({friend.email})
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.Error}>{error}</Text>
      <TouchableOpacity style={styles.postButton} onPress={onSubmit}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Error: {
    color: "red",
  },
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 23,
    paddingRight: 29,
    width: 360,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontFamily: "Handlee_400Regular",
  },
  descriptionTitle: {
    fontSize: 13,
    color: "rgba(31, 41, 55, 0.67)",
    marginBottom: 3,
  },
  input: {
    borderColor: "rgba(0, 0, 0, 0.04)",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 13,
    backgroundColor: "rgba(148, 127, 221, 0.07)",
  },
  descriptionInput: {
    height: 57,
    textAlignVertical: "top",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  locationInput: {
    height: 30,
    textAlignVertical: "top",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  postButton: {
    width: "100%",
    height: 54,
    borderRadius: 20,
    backgroundColor: "#8D78D9",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  postButtonText: {
    color: "white",
    fontSize: 17,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  showMotiveContainer: {
    gap: 9,
    marginTop: 9,
    marginBottom: 13,
  },
  showMotive: {
    flexDirection: "row",
    gap: 9,
    marginVertical: 15,
  },
  dateContainer: {
    height: 40,
    flexDirection: "row",
    marginBottom: 21,
    backgroundColor: "rgba(148, 127, 221, 0.07)",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },
  dateTitle: {
    height: 40,
    justifyContent: "center",
    backgroundColor: "rgba(148, 127, 221, 0.45)",
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateTitleText: {
    fontSize: 12,
    fontFamily: "Heebo_400Regular",
    color: "#1F2937",
  },
  date: {},
  dateText: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontFamily: "Heebo_400Regular",
    color: "#1F2937",
  },
  updownImage: {
    height: 30.4,
    width: 34.3,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 31,
  },
  closeText: {
    fontSize: 30,
    fontFamily: "Handlee_400Regular",
    color: "rgba(31, 41, 55, 0.67)",
  },
  motiveList: {
    height: 200,
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
  hourTimer: {
    justifyContent: "center",
    alignItems: "center",
    height: 39,
    width: 52,
    borderRadius: 9,
    borderWidth: 1,
    backgroundColor: "rgba(148, 127, 221, 0.45)",
    borderColor: "#4F5369",
    marginRight: 7,
  },
  minuteTimer: {
    justifyContent: "center",
    alignItems: "center",
    height: 39,
    width: 52,
    borderRadius: 9,
    borderWidth: 1,
    backgroundColor: "rgba(148, 127, 221, 0.09)",
    borderColor: "rgba(79, 83, 105, 0.5)",
    marginLeft: 7,
    marginRight: 13,
  },
  timerText: {
    fontFamily: "Heebo_400Regular",
    fontSize: 25,
    color: "#1F2937",
  },
  colonText: {
    fontFamily: "Heebo_400Regular",
    fontSize: 32,
    color: "#1F2937",
  },
  ampm: {},
  am: {
    justifyContent: "center",
    alignItems: "center",
    width: 27,
    height: 19,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  amText: {
    fontFamily: "Heebo_400Regular",
    fontSize: 10,
  },
  pmText: {
    fontFamily: "Heebo_400Regular",
    fontSize: 10,
  },
  pm: {
    justifyContent: "center",
    alignItems: "center",
    width: 27,
    height: 19,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 0,
  },
  ampmSelected: {
    backgroundColor: "rgba(148, 127, 221, 0.45)",
    borderColor: "rgba(79, 83, 105, 0.5)",
    borderWidth: 1,
  },
  ampmNotSelected: {
    backgroundColor: "rgba(148, 127, 221, 0.09)",

    borderColor: "rgba(79, 83, 105, 0.5)",
    borderWidth: 1,
  },
});

export default CreateMotive;

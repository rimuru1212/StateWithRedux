import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
<<<<<<< HEAD
import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { Appbar, Avatar, Banner, Button, Card, Divider, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, Switch, Text, TextInput } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";

// UI slice: theme + banners + notification
const uiSlice = createSlice({
  name: "ui",
  initialState: { darkMode: false, showBanner: true, notif: { visible: false, message: "", type: "", item: "" } },
=======
import * as Device from "expo-device"; // Native module via Expo
import * as Haptics from "expo-haptics"; // Native module via Expo
import { useMemo, useState } from "react";
import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { Appbar, Avatar, Banner, Button, Card, Divider, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, Switch, Text, TextInput } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";

/********************
 * Managing State with Redux
 * 1) Introduction to Redux
 * 2) Actions, reducers, store
 * 3) Connecting components
 ********************/

// UI slice: theme + banners
const uiSlice = createSlice({
  name: "ui",
  initialState: { darkMode: false, showBanner: true },
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    dismissBanner(state) {
      state.showBanner = false;
    },
<<<<<<< HEAD
    showNotif(state, action) {
      state.notif = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type,
        item: action.payload.item || "",
      };
    },
    hideNotif(state) {
      state.notif = { visible: false, message: "", type: "", item: "" };
    },
  },
});

// Todo slice
=======
  },
});


// Todo slice to demonstrate lists and immutable updates
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
const todosSlice = createSlice({
  name: "todos",
  initialState: { items: [] },
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(title) {
        return { payload: { id: nanoid(), title, done: false, createdAt: Date.now() } };
      },
    },
    toggleTodo(state, action) {
      const t = state.items.find((x) => x.id === action.payload);
      if (t) t.done = !t.done;
    },
    removeTodo(state, action) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    clearTodos(state) {
      state.items = [];
    },
<<<<<<< HEAD
    removePendingTodos(state) {
      state.items = state.items.filter((x) => x.done);
    },
    removeDoneTodos(state) {
      state.items = state.items.filter((x) => !x.done);
    },
    editTodo(state, action) {
      const { id, title } = action.payload;
      const t = state.items.find((x) => x.id === id);
      if (t) t.title = title;
    },
  },
});

const { toggleDarkMode, dismissBanner, showNotif, hideNotif } = uiSlice.actions;
const { addTodo, toggleTodo, removeTodo, clearTodos, editTodo } = todosSlice.actions;
=======
  },
});

const { toggleDarkMode, dismissBanner } = uiSlice.actions;
const { addTodo, toggleTodo, removeTodo, clearTodos } = todosSlice.actions;
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    todos: todosSlice.reducer,
  },
});

<<<<<<< HEAD
=======
/********************
 * App Root
 ********************/

>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemedApp />
    </ReduxProvider>
  );
}

function ThemedApp() {
  const darkMode = useSelector((s) => s.ui.darkMode);
  const theme = useMemo(() => (darkMode ? MD3DarkTheme : MD3LightTheme), [darkMode]);
  return (
    <PaperProvider theme={theme}>
<<<<<<< HEAD
      <SafeAreaView style={styles.safeArea}>
=======
      <SafeAreaView style={{ flex: 1 }}>
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
        <AppScaffold />
      </SafeAreaView>
    </PaperProvider>
  );
}

<<<<<<< HEAD
=======
/********************
 * User Interface Design
 * 1) Designing UIs for mobile
 * 2) Responsive/adaptive
 * 3) Best practices for mobile UI/UX (accessibility, touch targets, feedback)
 ********************/

>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
function AppScaffold() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const showBanner = useSelector((s) => s.ui.showBanner);

  return (
    <View style={[styles.container, isTablet && styles.containerTablet]}>
<<<<<<< HEAD
      <View style={styles.header}>
        <View style={styles.headerBackground} />
        <View style={styles.headerContent}>
          <Avatar.Icon size={40} icon="check-circle" style={styles.avatar} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Redux Todo Demo</Text>
            <Text style={styles.headerSubtitle}>Active & Done Cards</Text>
          </View>
          <Appbar.Action icon="cog" color="#fff" accessibilityLabel="Settings" onPress={() => alert('Settings coming soon!')} />
          <DarkModeSwitch />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          isTablet ? styles.contentTablet : styles.contentMobile,
          { paddingBottom: 24 }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[
          isTablet ? styles.rowTablet : styles.rowMobile,
          { alignItems: isTablet ? "flex-start" : "stretch", width: "100%" }
        ]}>
          <View style={isTablet ? styles.cardColumnTablet : styles.cardColumnMobile}>
            <TodosCard />
          </View>
          <View style={isTablet ? styles.cardSpacerTablet : styles.cardSpacerMobile} />
          <View style={isTablet ? styles.cardColumnTablet : styles.cardColumnMobile}>
            <DoneCard />
          </View>
=======
      <Appbar.Header>
        <Appbar.Content title="Expo + Redux Demo" subtitle={`Running on ${Device.osName ?? "Unknown OS"}`} />
        <DarkModeSwitch />
      </Appbar.Header>

      {showBanner && (
        <Banner
          visible
          actions={[{ label: "Got it", onPress: () => dispatch(dismissBanner()) }]}
          icon={({ size }) => (
            <Avatar.Icon size={size} icon="information-outline" />
          )}
        >
          This screen demonstrates Redux state, responsive layout, and native modules (Haptics, Device).
        </Banner>
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={[isTablet && styles.contentTablet, { paddingBottom: 24 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.column, isTablet && styles.columnTablet]}>
          <LibraryCard />
        </View>
        <View style={[styles.column, isTablet && styles.columnTablet]}>
          <TodosCard />
          <NativeModulesCard />
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
        </View>
      </ScrollView>

      <Appbar style={styles.footer}>
        <Appbar.Action icon="github" accessibilityLabel="GitHub" onPress={() => {}} />
<<<<<<< HEAD
        <Appbar.Content title="Footer" />
=======
        <Appbar.Content title="Footer" subtitle={Platform.select({ ios: "iOS", android: "Android", default: "Web" })} />
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
      </Appbar>
    </View>
  );
}

<<<<<<< HEAD
function NotificationBanner() {
  const dispatch = useDispatch();
  const notif = useSelector((s) => s.ui.notif);

  // Hide notification after 1.5 seconds
  const timerRef = useRef();
  React.useEffect(() => {
    if (notif.visible) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => dispatch(hideNotif()), 1500);
    }
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [notif.visible, dispatch]);

  if (!notif.visible) return null;

  // Custom message depending on type
  let msg = notif.message;
  if (notif.type === "add" && notif.item) {
    msg = `${notif.item} Added to your list.`;
  }
  if (notif.type === "delete" && notif.item) {
    msg = `${notif.item} Removed from your list.`;
  }
  if (notif.type === "edit" && notif.item) {
    msg = `${notif.item} updated.`;
  }
  if (notif.type === "clear") {
    msg = "All todos cleared!";
  }

  return (
    <Banner
      visible
      icon={({ size }) => (
        <Avatar.Icon size={size} icon={
          notif.type === "add" || notif.type === "edit"
            ? "plus"
            : notif.type === "clear"
            ? "delete"
            : "delete"
        } />
      )}
      style={{ backgroundColor:
        notif.type === "add" || notif.type === "edit"
          ? "#d1ffd1"
          : "#ffe1e1"
      }}
    >
      {msg}
    </Banner>
  );
}

=======
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
function DarkModeSwitch() {
  const dispatch = useDispatch();
  const darkMode = useSelector((s) => s.ui.darkMode);
  return (
<<<<<<< HEAD
    <View style={styles.darkModeSwitch}>
      <Text accessibilityRole="header" style={styles.darkModeText}>{darkMode ? "Dark" : "Light"}</Text>
=======
    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
      <Text accessibilityRole="header" style={{ marginRight: 8 }}>{darkMode ? "Dark" : "Light"}</Text>
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
      <Switch
        value={darkMode}
        onValueChange={() => dispatch(toggleDarkMode())}
        accessibilityLabel="Toggle dark mode"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      />
    </View>
  );
}

<<<<<<< HEAD
function TodosCard() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.todos.items.filter((x) => !x.done));
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 2 : 1;

  const handleAdd = () => {
    if (!title.trim()) return;
    dispatch(addTodo(title.trim()));
    dispatch(showNotif({ message: "", type: "add", item: title.trim() }));
    setTitle("");
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Active Todos"
        subtitle="To do"
        left={(props) => <Avatar.Icon {...props} icon="check-circle-outline" />}
      />
      <Card.Content>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            label="What needs doing?"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
            accessibilityLabel="Add new todo"
          />
          <Button
            mode="contained"
            onPress={handleAdd}
          >
            Add
          </Button>
        </View>
        <Divider style={styles.divider} />
=======
/********************
 * Working with External Libraries
 * 1) Using third-party libs (React Native Paper for UI)
 * 2) Popular libs showcase (Paper components)
 * 3) Integrating native modules (expo-haptics, expo-device)
 ********************/


function TodosCard() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.todos.items);
  const [title, setTitle] = useState("");
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 2 : 1; // responsive list

  return (
    <Card style={styles.card}>
      <Card.Title title="Todos (Redux list)" subtitle="Responsive FlatList" left={(props) => <Avatar.Icon {...props} icon="check-circle-outline" />} />
      <Card.Content>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            style={{ flex: 1 }}
            label="What needs doing?"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={() => {
              if (!title.trim()) return;
              dispatch(addTodo(title.trim()));
              setTitle("");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            returnKeyType="done"
          />
          <Button mode="contained" onPress={() => {
            if (!title.trim()) return;
            dispatch(addTodo(title.trim()));
            setTitle("");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}>Add</Button>
        </View>
        <Divider style={{ marginVertical: 12 }} />

>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
        <FlatList
          data={items}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
<<<<<<< HEAD
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) =>
            editingId === item.id ? (
              <Card style={styles.editCard}>
                <Card.Title
                  title="Edit Todo"
                  left={(props) => <Avatar.Icon {...props} icon="pencil" />}
                />
                <Card.Content>
                  <TextInput
                    value={editText}
                    onChangeText={setEditText}
                    label="Edit todo"
                    autoFocus
                    accessibilityLabel="Edit todo input"
                  />
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() => {
                      if (editText.trim()) {
                        dispatch(editTodo({ id: item.id, title: editText.trim() }));
                        dispatch(showNotif({ message: "", type: "edit", item: editText.trim() }));
                      }
                      setEditingId(null);
                      setEditText("");
                    }}
                  >
                    Save
                  </Button>
                  <Button onPress={() => { setEditingId(null); setEditText(""); }}>
                    Cancel
                  </Button>
                </Card.Actions>
              </Card>
            ) : (
              <Card style={styles.todoCard}>
                <Card.Title
                  title={item.title}
                  subtitle={new Date(item.createdAt).toLocaleString()}
                  left={(props) => <Avatar.Icon {...props} icon="circle-outline" />}
                  right={(props) => (
                    <View style={styles.todoActions}>
                      <Button
                        compact
                        accessibilityLabel="Edit todo"
                        onPress={() => {
                          setEditingId(item.id);
                          setEditText(item.title);
                        }}
                      >
                        Edit
                      </Button>
                    </View>
                  )}
                />
                <Card.Actions>
                  <Button onPress={() => dispatch(toggleTodo(item.id))}>
                    Done
                  </Button>
                  <Button onPress={() => {
                    dispatch(removeTodo(item.id));
                    dispatch(showNotif({ message: "", type: "delete", item: item.title }));
                  }} style={styles.removeButton}>
                    Remove
                  </Button>
                </Card.Actions>
              </Card>
            )
          }
          ListEmptyComponent={<Text accessibilityLabel="Empty list">No active todos. Add one above.</Text>}
        />
        {items.length > 0 && (
          <Button style={styles.clearButton} onPress={() => {
            dispatch({ type: 'todos/removePendingTodos' });
            dispatch(showNotif({ message: "", type: "clear" }));
          }}>
            Clear All
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

function DoneCard() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.todos.items.filter((x) => x.done));
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 2 : 1;

  return (
    <Card style={styles.card}>
      <Card.Title
        title="Done"
        subtitle="Completed todos"
        left={(props) => <Avatar.Icon {...props} icon="check" />}
      />
      <Card.Content>
        <FlatList
          data={items}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <Card style={styles.doneCard}>
              <Card.Title
                title={item.title}
                subtitle={new Date(item.createdAt).toLocaleString()}
                left={(props) => <Avatar.Icon {...props} icon="check" />}
              />
              <Card.Actions>
                <Button onPress={() => dispatch(toggleTodo(item.id))}>
                  Mark Undone
                </Button>
                <Button onPress={() => {
                  dispatch(removeTodo(item.id));
                  dispatch(showNotif({ message: "", type: "delete", item: item.title }));
                }} style={styles.removeButton}>
                  Remove
                </Button>
              </Card.Actions>
            </Card>
          )}
          ListEmptyComponent={<Text accessibilityLabel="Empty done list">No completed todos yet.</Text>}
        />
        {items.length > 0 && (
          <Button style={styles.clearButton} onPress={() => {
            dispatch({ type: 'todos/removeDoneTodos' });
            dispatch(showNotif({ message: 'Completed todos cleared!', type: 'clear' }));
          }}>
            Clear All
          </Button>
=======
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <Card style={{ flex: 1, marginRight: numColumns > 1 ? 8 : 0 }}>
              <Card.Title
                title={item.title}
                subtitle={new Date(item.createdAt).toLocaleString()}
                left={(props) => <Avatar.Icon {...props} icon={item.done ? "check" : "circle-outline"} />}
              />
              <Card.Actions>
                <Button onPress={() => dispatch(toggleTodo(item.id))}>{item.done ? "Undo" : "Done"}</Button>
                <Button onPress={() => dispatch(removeTodo(item.id))} textColor="#d11">Remove</Button>
              </Card.Actions>
            </Card>
          )}
          ListEmptyComponent={<Text accessibilityLabel="Empty list">No todos yet. Add one above.</Text>}
        />
        {items.length > 0 && (
          <Button style={{ marginTop: 8 }} onPress={() => dispatch(clearTodos())}>Clear All</Button>
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
        )}
      </Card.Content>
    </Card>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, backgroundColor: "#6e5670ff" }, // light green
  containerTablet: { paddingHorizontal: 12 },
  header: {
    backgroundColor: 'transparent',
    height: 64,
    justifyContent: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#898d89ff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  avatar: { backgroundColor: '#fff', marginRight: 12 },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontWeight: 'bold', fontSize: 12, color: '#fff', marginBottom: 12, margin: 10 },
  headerSubtitle: { fontSize: 14, color: '#e0f2f1' },
  content: { flex: 1, padding: 12 },
  contentTablet: { flexDirection: "row", justifyContent: "center", alignItems: "flex-start" },
  contentMobile: { flexDirection: "column", alignItems: "stretch" },
  rowTablet: { flexDirection: "row", width: "100%" },
  rowMobile: { flexDirection: "column", width: "100%" },
  cardColumnTablet: { flex: 1, alignSelf: 'stretch', minWidth: 300, maxWidth: 500 },
  cardColumnMobile: { width: "100%", alignSelf: "stretch" },
  cardSpacerTablet: { width: 18, height: "auto" },
  cardSpacerMobile: { height: 18, width: "auto" },
  card: { marginBottom: 12, borderRadius: 16, overflow: "hidden", alignSelf: 'stretch' },
  footer: { justifyContent: "center" },
  inputContainer: { flexDirection: "row", gap: 8 },
  textInput: { flex: 1 },
  divider: { marginVertical: 12 },
  flatListContainer: { gap: 8 },
  editCard: { flex: 1, marginRight: 8 },
  todoCard: { flex: 1, marginRight: 8 },
  todoActions: { flexDirection: "row", gap: 8 },
  removeButton: { backgroundColor: '#db5829ff' },
  clearButton: { marginTop: 8 },
  darkModeSwitch: { flexDirection: "row", alignItems: "center", paddingRight: 12 },
  darkModeText: { marginRight: 8 },
  doneCard: { flex: 1, marginRight: 8 },
=======
function LibraryCard() {
}

function NativeModulesCard() {
 
}

/********************
 * Styles — mobile‑first, adapt on tablets
 ********************/

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  containerTablet: { paddingHorizontal: 12 },
  content: { flex: 1, padding: 12 },
  contentTablet: { flexDirection: "row", gap: 12 },
  column: { flex: 1 },
  columnTablet: { flex: 1 },
  card: { marginBottom: 12, borderRadius: 16, overflow: "hidden" },
  footer: { justifyContent: "center" },
>>>>>>> b09daf6ef393eb886303c8fe8410a5a8cd9fe8f2
});

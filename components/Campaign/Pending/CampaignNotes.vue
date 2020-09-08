<template>
    <div>
        <textarea class="textareaStyle" v-on:keyup="saveNote" v-model="noteData"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
            noteData: ''
        }
    },
    props: {
        noteDataOg: String

    },
    methods: {
        saveNote() {
            this.$emit('save-note', this.noteData)
        }
    },
    watch: {
        noteDataOg() {
            this.noteData = this.noteDataOg
        }
    }
}
</script>

<style scoped>
.textareaStyle {
    width: 100%;
    height: 130px;
    border-radius: 5px;
    border: 1px solid #EEEEEE;
    background-color: #FDFDFD;
    padding: 10px;
    resize: none;
    font-size: 16px;
}
</style>
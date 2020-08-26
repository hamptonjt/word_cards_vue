<template>
  <div class="container is-fluid">
    <nav class="panel">
      <p class="panel-heading">
        <b>Sight Words</b>
      </p>
    </nav>
    <div class="panel-heading">
      <div class="column is-12">
        <b-field grouped>
          <b-field label="Select a Word Set:" expanded>
            <b-select v-model="selectedSet">
              <option v-for="set in filteredSets" :key="set" :value="set">
                {{ set }}
              </option>
            </b-select>
          </b-field>
          <b-field>
            <button class="button is-primary is-pulled-right mt-4" @click="toggle">
              {{ this.indexState ? 'Stop Index' : 'Start Index' }}
            </button>
          </b-field>
        </b-field>
      </div>
    </div>
    <div class="panel-heading" v-if="this.indexState">
      <div>
        Loading...
      </div>
      <b-modal v-model="indexState" :width="640">
        <div class="card">
          <button class="button is-success is-pulled-right mt-6 mr-4" @click="getNextWord">
            Next Word
          </button>
          <div class="card-content">
            <span v-if="isColor && (currentWord !== 'white' && currentWord !== 'pink' && currentWord !== 'yellow')" :style="{color: currentWord}" style="font-size: 3em">{{ currentWord }}</span>
            <span v-else-if="isColor && (currentWord === 'white' || currentWord === 'pink' || currentWord === 'yellow')" :style="{background: currentWord, color: 'black'}" style="font-size: 3em">{{ currentWord }}</span>
            <span v-else style="font-size: 3em">{{ currentWord }}</span>
            <p>&nbsp;</p>
          </div>
        </div>
      </b-modal>
    </div>
    <div class="panel-heading" v-else>
      <div class="column">
        <b-table :data="filteredWords"
                 :bordered="isBordered"
                 :striped="isStriped"
                 :narrowed="isNarrowed"
                 :paginated="isPaginated"
                 :per-page="selectedPerPage"
                 :pagination-simple="isPaginationSimple"
                 :current-page.sync="currentPage">
          <b-table-column field="word"
                          label="Word"
                          sortable
                          v-slot="props">
            {{ props.row.word }}
          </b-table-column>
          <b-table-column field="set"
                          label="Set"
                          sortable
                          v-slot="props">
            {{ props.row.set }}
          </b-table-column>

          <!-- </template> -->
          <template slot="bottom-left">
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label" for="ipp">Items Per Page </label>
              </div>
              <div class="field">
                <select id="ipp" class="form-control" v-model="selectedPerPage">
                  <option v-for="itemsPerPage in perPage" :selected="itemsPerPage" :key="itemsPerPage">
                    {{ itemsPerPage }}
                  </option>
                </select>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'words',
  data () {
    return {
      versionNum        : process.env.VUE_APP_VERSION,
      isLoading         : false,
      isBordered        : true,
      isStriped         : true,
      isNarrowed        : true,
      isPaginated       : true,
      selectedPerPage   : 10,
      perPage           : [5, 10, 15, 20],
      isPaginationSimple: false,
      currentPage       : 1,
      isFullPage        : true,
      isErr             : false,
      editRec           : {},
      selectedSet       : 0,
      indexState        : false,
      usedWords         : [],
      currentWord       : ''
    }
  },
  methods: {
    ...mapActions(['clearSet', 'loadData', 'setSet', 'createWord']),
    save () {
      this.isLoading = true
      this.createWord(this.editRec).then(() => {
        this.isLoading = false
        console.log('success!')
        this.$buefy.snackbar.open({
          message : 'Word saved!',
          type    : 'is-primary-invert',
          position: 'is-top'
        })
      }).catch(e => {
        this.isLoading = false
        console.error(e)
        this.$buefy.snackbar.open({
          message : 'Word NOT saved!',
          type    : 'is-danger-invert',
          position: 'is-top'
        })
      })
    },
    selectRow (row) {
      console.log(row)
      this.setStudent(row)
      this.editRec = row
    },
    toggle () {
      this.indexState = !this.indexState
      if (this.indexState) {
        this.usedWords = []
        this.getFirstWord()
      }
    },
    getFirstWord () {
      const word = this.filteredWords[Math.floor(Math.random() * this.filteredWords.length)].word
      this.usedWords.push(word)
      this.currentWord = word
    },
    getNextWord () {
      let word = this.filteredWords[Math.floor(Math.random() * this.filteredWords.length)].word
      while (this.usedWords.includes(word) && this.usedWords.length < this.filteredWords.length) {
        word = this.filteredWords[Math.floor(Math.random() * this.filteredWords.length)].word
      }
      if (this.usedWords.length === this.filteredWords.length) {
        this.currentWord = 'Completed Set!'
      } else {
        this.usedWords.push(word)
        this.currentWord = word
      }
    }
  },
  computed: {
    ...mapGetters({
      getSelectedSet: 'getSelectedSet',
      getWords      : 'getWords'
    }),
    filteredWords () {
      const filtered = this.getWords.filter(word => {
        if (this.selectedSet > 0) {
          return word.set === this.selectedSet
        } else {
          return true // all words
        }
      })
      return filtered
    },
    filteredSets () {
      const setResult = []
      this.getWords.map(word => {
        if (!setResult.includes(word.set)) {
          setResult.push(word.set)
        }
      })
      return setResult
    },
    isColor () {
      const c = new Option().style
      c.color = this.currentWord
      return c.color === this.currentWord
    }
  },
  created: function () {
    this.isLoading = true
    this.loadData().then(() => {
      this.isLoading = false
      this.isErr = false
    }).catch(e => {
      this.isLoading = false
      this.isErr = true
      console.error(e)
    })
  }
}
</script>
